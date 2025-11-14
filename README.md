<div align="center">

# 🚀 MedAlo AI Blog Generator

**AI 기반 블로그 콘텐츠 자동 생성 도구**

Google Gemini AI를 활용한 전문적인 블로그 포스트, 이미지, SEO 메타데이터 자동 생성

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-19.1.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5.8-blue)](https://www.typescriptlang.org/)

[빠른 시작](#-빠른-시작) • [주요 기능](#-주요-기능) • [사용 방법](#-사용-방법) • [문서](./run.md)

</div>

---

## ✨ 주요 기능

### 🖼️ **이미지 업로드 & AI 분석** (NEW!)
- 📸 **최대 4개 이미지 업로드** (총 20MB 제한)
  - 1번째 이미지 → 대표 이미지 (썸네일)
  - 2~4번째 이미지 → 본문 서브 이미지
- 🤖 **Gemini AI 이미지 분석**
  - 이미지 속 텍스트, 데이터, 차트 자동 인식
  - 제품명, 브랜드, 모델명 추출
  - 시각적 특징 분석 (색상, 디자인, 구성)
- ✍️ **분석 결과 기반 콘텐츠 생성**
  - 이미지 내용을 우선 반영한 블로그 작성
  - 자연스러운 이미지 참조 문장 자동 삽입
  - 제품 리뷰, 가전제품 소개 등에 최적화

**활용 사례**:
- 제품 리뷰 (스마트폰, 가전제품 등)
- 비교 분석 (성능 차트, 가격 비교)
- 사용 후기 (실제 사용 사진 기반)
- 인포그래픽 기반 콘텐츠

### 📝 AI 콘텐츠 생성
- 🎯 **블로그 주제 추천**
  - E-E-A-T 기반 (경험, 전문성, 권위성, 신뢰성)
  - 에버그린 콘텐츠 (시간이 지나도 가치 있는 주제)
  - 롱테일 키워드 (검색 최적화)
  - 네이버 뉴스 기반 트렌드 분석
  - 메모/파일 기반 주제 생성

- ✍️ **전문적인 블로그 포스트 자동 작성**
  - 2,500~3,000자 분량의 고품질 콘텐츠
  - SEO 최적화된 구조 (H2, H3 태그 활용)
  - 읽기 쉬운 친근한 문체
  - 표, 리스트, 정보 박스 등 다양한 레이아웃
  - 7가지 프로페셔널 컬러 테마

### 🩺 **PDF 참조 기능** (선택적)
- 📚 **전문 자료 우선 참조**
  - 탈모 관련 주제 자동 감지
  - `book.pdf`에서 관련 정보 검색
  - 체크박스로 활성화/비활성화 제어

- 📖 **자동 출처 표기**
  - 출처: 노윤우 박사
  - 참조 페이지 자동 추적 및 표시
  - 전문성과 신뢰성 강화

**지원 키워드**: 탈모, 모발, 두피, 피나스테리드, 미녹시딜, 모발 이식 등

### 🖼️ 이미지 생성
- **대표 이미지 자동 생성** (16:9 또는 1:1 비율)
  - Google Imagen 4.0 기반 고품질 이미지
  - DALL-E 스타일의 영문 프롬프트 자동 생성
  - 한글 alt 텍스트 자동 생성 (SEO 최적화)

- **서브 이미지 자동 배치** (본문 내 최대 3개)
  - 콘텐츠 흐름에 맞춘 자동 배치
  - 각 이미지별 맞춤 프롬프트 생성

- **업로드 이미지 우선 사용**
  - 이미지를 업로드하면 AI 생성 대신 사용
  - 개별/전체 삭제 기능
  - 미리보기 및 순서 확인

### 📱 소셜 미디어 통합
- **플랫폼별 맞춤 포스트 자동 생성**
  - **Threads**: 비격식 반말 톤, 이모지 활용, 1개 해시태그
  - **Instagram**: 시각 중심, 5~10개 해시태그, CTA
  - **Facebook**: 긴 형식, 공유/댓글 유도
  - **X (Twitter)**: 280자 이내, 2~3개 해시태그

### 🎨 디자인 & 테마
- **7가지 컬러 테마**
  - 모던 블루, 프레시 그린, 우아한 퍼플, 따뜻한 오렌지
  - 프로페셔널 그레이, 생동감 있는 핑크, 차분한 티크

- **인터랙티브 요소 자동 생성**
  - 계산기, 퀴즈, 체크리스트 등
  - 사용자 참여 유도

- **반응형 디자인**
  - 모바일, 태블릿, 데스크톱 완벽 지원

### 🔍 SEO 최적화
- **메타데이터 자동 생성**
  - 5개의 SEO 최적화 제목
  - 10개의 타겟 키워드
  - 검색 의도 분석

- **키워드 리서치 도구**
  - 검색량, 경쟁도, CPC 분석
  - 연관 키워드 추천

---

## 🚀 빠른 시작

### 필수 요구사항
- Node.js 18.x 이상
- npm 9.x 이상
- Gemini API 키 ([무료 발급](https://aistudio.google.com/app/apikey))

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/finbot8912/blog.git
cd blog

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정 (.env 파일 생성)
echo "GEMINI_API_KEY=your_api_key_here" > .env

# 4. 개발 서버 실행
npm run dev
```

서버가 실행되면 브라우저에서 `http://localhost:3000`으로 접속하세요.

📖 **상세한 실행 가이드**: [run.md](./run.md) 문서를 참고하세요.

---

## 📖 사용 방법

### 기본 워크플로우

#### 1️⃣ 블로그 주제 입력
- 직접 입력하거나 AI 추천 받기
- E-E-A-T 카테고리별 주제 탐색
- 메모/파일 업로드로 초안 활용

#### 2️⃣ 옵션 설정
- **컬러 테마 선택**: 7가지 중 선택
- **이미지 옵션**:
  - ☑️ 대표 이미지 생성 (16:9 또는 1:1)
  - ☑️ 서브 이미지 생성 (최대 3개)
- **고급 옵션**:
  - ☑️ 인터랙티브 요소 포함
  - 📝 추가 요청사항 입력

#### 3️⃣ 이미지 업로드 (선택)
1. "첨부한 이미지 참조" 체크박스 활성화
2. 이미지 추가 버튼 클릭 (최대 4개, 20MB)
3. 이미지 순서 확인:
   - 🎯 1번: 대표 이미지
   - 📷 2~4번: 서브 이미지
4. 필요시 개별/전체 삭제 가능

#### 4️⃣ PDF 참조 활성화 (선택)
- 탈모 관련 주제일 경우 체크박스 활성화
- `book.pdf`의 전문 자료 자동 검색
- 출처 자동 표기

#### 5️⃣ 생성 및 편집
1. "블로그 생성" 버튼 클릭
2. 생성 완료 후 미리보기/HTML 전환
3. 필요시 이미지 재생성
4. SEO 제목/키워드 복사
5. 소셜 미디어 포스트 활용

---

## 🛠️ 기술 스택

### Frontend
- **React** 19.1.0 - 최신 React 기능 활용
- **TypeScript** 5.8 - 타입 안정성
- **Vite** 6.2.0 - 빠른 개발 서버 및 빌드

### AI & Image
- **Google Gemini 2.5 Flash** - 텍스트 생성 및 이미지 분석
- **Google Imagen 4.0** - 고품질 이미지 생성
- **PDF.js** - PDF 처리 및 텍스트 추출

### Styling
- **Tailwind CSS** - 유틸리티 기반 스타일링
- **Inline Styles** - 테마 기반 동적 스타일

---

## 📁 프로젝트 구조

```
blog/
├── public/
│   └── book.pdf              # 전문 의학 자료 (탈모 관련)
├── src/
│   ├── services/
│   │   ├── geminiService.ts      # AI 콘텐츠 생성 및 이미지 분석
│   │   ├── pdfService.ts         # PDF 처리 및 검색
│   │   └── keywordService.ts     # 키워드 분석 및 SEO
│   ├── components/
│   │   ├── BlogResultsTable.tsx  # 주제 추천 결과
│   │   ├── CurrentStatus.tsx     # 생성 상태 표시
│   │   ├── Icon.tsx              # 소셜 미디어 아이콘
│   │   ├── NaverNewsResults.tsx  # 뉴스 기반 추천
│   │   ├── ResultsTable.tsx      # 범용 결과 테이블
│   │   └── Shortcuts.tsx         # 트렌드 바로가기
│   ├── App.tsx                   # 메인 애플리케이션
│   ├── constants.ts              # 테마, 카테고리 상수
│   ├── types.ts                  # TypeScript 타입 정의
│   └── main.tsx                  # 앱 진입점
├── index.html                    # HTML 템플릿
├── vite.config.ts                # Vite 설정
├── tsconfig.json                 # TypeScript 설정
├── README.md                     # 프로젝트 소개
└── run.md                        # 실행 가이드
```

---

## 🔧 추가 명령어

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 타입 체크
npx tsc --noEmit

# 테스트 실행
npm test
```

---

## 🎯 주요 사용 사례

### 1. 제품 리뷰 블로그
- 제품 사진 4장 업로드
- AI가 이미지 분석하여 스펙, 디자인, 특징 추출
- 자동으로 구조화된 리뷰 포스트 생성

### 2. 가전제품 소개
- 제품 박스, 구성품, 사용 모습 사진 업로드
- 비교 차트나 성능 그래프 포함 가능
- 소셜 미디어용 요약 포스트 자동 생성

### 3. 탈모 관련 전문 콘텐츠
- PDF 참조 기능 활성화
- 의학적 근거 기반 콘텐츠 생성
- 출처 자동 표기로 신뢰성 확보

### 4. SEO 최적화 블로그
- 키워드 리서치 도구 활용
- SEO 제목 5개 자동 생성
- 메타 설명 및 타겟 키워드 제공

---

## 🔑 주요 특징

### 🤖 AI 기반 자동화
- 블로그 작성, 이미지 생성, SEO 최적화 모두 자동화
- 일관된 품질의 콘텐츠 생성
- 시간 절약 (수동 작성 대비 80% 이상)

### 📸 이미지 인텔리전스
- 업로드한 이미지를 AI가 이해하고 활용
- 텍스트 인식, 데이터 추출, 시각적 분석
- 이미지와 텍스트의 완벽한 조화

### 📚 전문성과 신뢰성
- PDF 참조로 전문 자료 인용
- 출처 자동 표기 시스템
- E-E-A-T 원칙 준수

### 🎨 유연한 커스터마이징
- 7가지 테마, 2가지 종횡비
- 추가 요청사항 반영
- 인터랙티브 요소 추가

---

## 🆕 최신 업데이트

### v2.0.0 (2025-01-14)
- ✨ **이미지 업로드 및 AI 분석 기능 추가**
  - 최대 4개 이미지 업로드 (20MB)
  - Gemini 2.5 Flash 이미지 분석
  - 분석 결과 기반 콘텐츠 생성
  - 자동 이미지 배치 시스템

- 🔧 **PDF 참조 기능 개선**
  - 선택적 활성화 (체크박스)
  - 사용자 제어 강화

- 📊 **카테고리 확장**
  - E-E-A-T 전체 카테고리에 "탈모관리" 추가
  - 에버그린 카테고리에 "가전제품, 스마트기기" 추가

---

## 📝 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

---

## 🤝 기여

이슈 및 풀 리퀘스트는 언제나 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 문의 및 지원

문제가 발생하거나 궁금한 점이 있으시면:
1. [GitHub Issues](https://github.com/finbot8912/blog/issues) 등록
2. [run.md](./run.md)의 문제 해결 섹션 참고
3. [CLAUDE.md](./CLAUDE.md)의 개발 가이드 확인

---

## 🙏 감사의 말

이 프로젝트는 다음 기술들을 사용합니다:
- [Google Gemini](https://ai.google.dev/) - AI 콘텐츠 생성 및 이미지 분석
- [Google Imagen](https://deepmind.google/technologies/imagen-2/) - 이미지 생성
- [React](https://react.dev/) - UI 프레임워크
- [Vite](https://vitejs.dev/) - 빌드 도구
- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF 처리

---

<div align="center">

**Made with ❤️ by MedAlo**

⭐ 이 프로젝트가 유용하다면 Star를 눌러주세요!

[🏠 홈](https://github.com/finbot8912/blog) • [📖 문서](./run.md) • [🐛 이슈](https://github.com/finbot8912/blog/issues)

</div>
