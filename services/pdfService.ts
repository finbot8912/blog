import * as pdfjsLib from 'pdfjs-dist';

// ✅ PDF.js worker 설정 - 로컬 파일 사용 (CDN 로딩 문제 해결)
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

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
    console.log(`[PDF 검색 시작] 주제: "${topic}"`);
    
    // 주제에서 핵심 키워드 추출
    const keywords = extractKeywords(topic);
    console.log(`[키워드 추출] ${keywords.join(', ')}`);
    
    // ✅ 탈모 및 약물 관련 광범위한 키워드 추가 (검색 성공률 대폭 향상)
    const additionalKeywords = [
      // 일반 탈모 키워드
      '탈모', '모발', '두피', '치료', '약물', '효과', '부작용', '머리', '헤어',
      // 약물명 키워드
      '프로페시아', '피나스테리드', '피나스테라이드', 'finasteride', 'propecia',
      '미녹시딜', '미녹시딜', 'minoxidil', 'rogaine',
      '두타스테리드', 'dutasteride', '아보다트',
      // 치료 관련
      '복용', '사용', '처방', '투여', '도포', '바르',
      // 효과 관련
      '개선', '억제', '방지', '성장', '발모', '육모',
      // 부작용 관련
      '주의', '경고', '위험', '증상', '반응'
    ];
    const allKeywords = [...new Set([...keywords, ...additionalKeywords])];
    console.log(`[확장 키워드 ${allKeywords.length}개] ${allKeywords.slice(0, 10).join(', ')}...`);
    
    // PDF 로드
    const loadingTask = pdfjsLib.getDocument(pdfPath);
    const pdf = await loadingTask.promise;
    console.log(`[PDF 로드 완료] 총 ${pdf.numPages} 페이지`);
    
    const relevantContent: Array<{ text: string; pageNum: number; score: number }> = [];
    
    // 모든 페이지를 검색
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      // 키워드 매칭 점수 계산 (더 많은 키워드가 매칭될수록 높은 점수)
      let score = 0;
      for (const keyword of allKeywords) {
        const regex = new RegExp(keyword, 'gi');
        const matches = pageText.match(regex);
        if (matches) {
          score += matches.length;
        }
      }
      
      if (score > 0) {
        relevantContent.push({ text: pageText, pageNum, score });
        console.log(`[페이지 ${pageNum}] 매칭 점수: ${score}`);
      }
    }
    
    // 점수 순으로 정렬 (관련성이 높은 순)
    relevantContent.sort((a, b) => b.score - a.score);
    
    console.log(`[검색 완료] 관련 페이지 ${relevantContent.length}개 발견`);
    
    // 상위 페이지들의 내용 결합 (최대 3000자로 증가)
    let combinedText = '';
    const pageNumbers = new Set<number>();
    const maxLength = 3000;
    
    for (const item of relevantContent) {
      if (combinedText.length < maxLength) {
        // 페이지 구분을 명확하게
        combinedText += `[페이지 ${item.pageNum}]\n${item.text}\n\n`;
        pageNumbers.add(item.pageNum);
      } else {
        break;
      }
    }
    
    // ✅ 관련 내용이 없거나 부족하면 전체 PDF에서 대량 추출 (필수)
    if (combinedText.length < 500) {
      console.log('[대체 전략] 키워드 매칭 실패. 전체 PDF에서 최대한 추출합니다.');

      // 전체 PDF의 처음 10페이지 또는 전체 페이지 중 작은 것
      const pagesToExtract = Math.min(10, pdf.numPages);
      console.log(`[추출 시작] 총 ${pagesToExtract}페이지 추출`);

      for (let pageNum = 1; pageNum <= pagesToExtract; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');

        // 각 페이지에서 최대 1000자 추출
        const extractedText = pageText.substring(0, 1000);
        if (extractedText.trim().length > 0) {
          combinedText += `[페이지 ${pageNum}]\n${extractedText}\n\n`;
          pageNumbers.add(pageNum);
          console.log(`[페이지 ${pageNum}] ${extractedText.length}자 추출`);
        }

        // 최대 길이 도달 시 중단
        if (combinedText.length >= maxLength) {
          console.log('[추출 완료] 최대 길이 도달');
          break;
        }
      }

      console.log(`[대체 전략 완료] 총 ${combinedText.length}자 추출됨`);
    }
    
    const result = {
      content: combinedText.substring(0, maxLength),
      pageNumbers: Array.from(pageNumbers).sort((a, b) => a - b)
    };
    
    console.log(`[최종 결과] 텍스트 길이: ${result.content.length}자, 참조 페이지: ${result.pageNumbers.join(', ')}`);
    
    return result;
  } catch (error) {
    console.error('[PDF 검색 오류]', error);
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

