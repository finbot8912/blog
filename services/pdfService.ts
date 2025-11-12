import * as pdfjsLib from 'pdfjs-dist';

// PDF.js worker 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * PDF 파일의 텍스트 내용을 추출합니다.
 * @param pdfPath PDF 파일 경로
 * @returns 추출된 텍스트
 */
export const extractTextFromPDF = async (pdfPath: string): Promise<string> => {
  try {
    // PDF 파일을 로드합니다
    const loadingTask = pdfjsLib.getDocument(pdfPath);
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    // 모든 페이지의 텍스트를 추출합니다
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }
    
    return fullText;
  } catch (error) {
    console.error('PDF 텍스트 추출 에러:', error);
    throw new Error('PDF 파일을 읽을 수 없습니다.');
  }
};

/**
 * 주제가 탈모 관련인지 확인합니다.
 * @param topic 블로그 주제
 * @returns 탈모 관련 여부
 */
export const isHairLossRelated = (topic: string): boolean => {
  // 탈모 관련 키워드 목록
  const hairLossKeywords = [
    '탈모', '모발', '두피', '헤어', '머리카락', '모근', '모낭',
    '대머리', '원형 탈모', '지루성 탈모', 'M자 탈모',
    '피나스테리드', '두타스테리드', '미녹시딜', '프로페시아', '아보다트',
    '모발 이식', '모발 건강', '두피 건강', '샴푸', '트리트먼트',
    '발모', '육모', '앞머리', '정수리', '가르마'
  ];
  
  // 주제를 소문자로 변환하고 키워드 포함 여부 확인
  const lowerTopic = topic.toLowerCase();
  return hairLossKeywords.some(keyword => 
    lowerTopic.includes(keyword.toLowerCase())
  );
};

/**
 * PDF에서 특정 주제와 관련된 내용을 검색합니다.
 * @param pdfPath PDF 파일 경로
 * @param topic 검색할 주제
 * @returns 관련 내용과 참조 정보를 포함한 객체
 */
export const searchRelevantContent = async (pdfPath: string, topic: string): Promise<{ content: string; pageNumbers: number[] }> => {
  try {
    // 주제에서 핵심 키워드 추출
    const keywords = extractKeywords(topic);
    
    // PDF 로드
    const loadingTask = pdfjsLib.getDocument(pdfPath);
    const pdf = await loadingTask.promise;
    
    const relevantContent: Array<{ text: string; pageNum: number }> = [];
    
    // 모든 페이지를 검색
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      // 키워드 매칭 확인
      const matchCount = keywords.filter(keyword => 
        pageText.toLowerCase().includes(keyword.toLowerCase())
      ).length;
      
      if (matchCount > 0) {
        relevantContent.push({ text: pageText, pageNum });
      }
    }
    
    // 관련 내용 결합 (최대 2000자)
    let combinedText = '';
    const pageNumbers = new Set<number>();
    
    for (const item of relevantContent) {
      if (combinedText.length < 2000) {
        combinedText += item.text + '\n\n';
        pageNumbers.add(item.pageNum);
      } else {
        break;
      }
    }
    
    return {
      content: combinedText.substring(0, 2000),
      pageNumbers: Array.from(pageNumbers).sort((a, b) => a - b)
    };
  } catch (error) {
    console.error('PDF 내용 검색 에러:', error);
    return { content: '', pageNumbers: [] };
  }
};

/**
 * 주제에서 핵심 키워드를 추출합니다.
 * @param topic 주제
 * @returns 키워드 배열
 */
const extractKeywords = (topic: string): string[] => {
  // 불용어 제거 (조사, 접속사 등)
  const stopWords = ['의', '가', '이', '은', '는', '을', '를', '에', '와', '과', '로', '으로', '에서', '부터', '까지', '하는', '하기', '위한', '관한'];
  
  // 공백, 특수문자 기준으로 분리
  const words = topic.split(/[\s,]+/);
  
  // 불용어 제거 및 2글자 이상 단어만 추출
  return words.filter(word => 
    word.length >= 2 && !stopWords.includes(word)
  );
};

/**
 * PDF 객체를 캐시합니다 (성능 최적화)
 */
let cachedPdf: any = null;

/**
 * PDF를 가져옵니다 (캐시 사용)
 * @param pdfPath PDF 파일 경로
 * @returns PDF 객체
 */
export const getPdf = async (pdfPath: string = '/book.pdf'): Promise<any> => {
  if (cachedPdf) {
    return cachedPdf;
  }
  
  const loadingTask = pdfjsLib.getDocument(pdfPath);
  cachedPdf = await loadingTask.promise;
  return cachedPdf;
};

