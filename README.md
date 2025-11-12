<div align="center">

# 🏥 MedAlo Blog 생성 가이즈

**의료/건강 전문 블로그 콘텐츠 자동 생성 도구**

AI와 전문 의학 자료를 결합한 신뢰할 수 있는 블로그 콘텐츠 제작

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-19.1.0-blue)](https://react.dev/)

[빠른 시작](#빠른-시작) • [주요 기능](#주요-기능) • [사용 방법](#사용-방법) • [문서](./run.md)

</div>

---

## ✨ 주요 기능

### 📝 콘텐츠 생성
- 🎯 **다양한 주제 추천**
  - E-E-A-T 기반 (경험, 전문성, 권위성, 신뢰성)
  - 에버그린 콘텐츠 (시간이 지나도 가치 있는 주제)
  - 롱테일 키워드 (검색 최적화)
  - 카테고리별 트렌드 분석
  - 메모/파일 기반 주제 생성

- ✍️ **AI 기반 블로그 포스트 자동 생성**
  - 2,500~3,000자 분량의 전문적인 콘텐츠
  - SEO 최적화된 구조
  - 읽기 쉬운 문체와 톤
  - 표, 리스트, 정보 박스 등 다양한 레이아웃

### 🖼️ 비주얼 콘텐츠
- **대표 이미지 자동 생성** (16:9 또는 1:1 비율)
- **서브 이미지 자동 배치** (본문 내 2~3개)
- **썸네일 생성 도구**
  - 이미지 위에 텍스트 추가
  - 다양한 폰트 및 색상 선택
  - 크기 및 외곽선 조절

### 📱 소셜 미디어 통합
- Threads, Instagram, Facebook, X(Twitter) 맞춤형 포스트 자동 생성
- 플랫폼별 최적화된 해시태그 제안
- 행동 유도 문구(CTA) 자동 삽입

### 🎨 디자인 & 테마
- 8가지 이상의 프로페셔널 컬러 테마
- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 인터랙티브 요소 자동 생성 (계산기, 퀴즈 등)

### 📚 **전문 자료 통합** (핵심 기능)
- 🩺 **의학 전문 자료 우선 참조**
  - 탈모 관련 주제 자동 감지
  - `book.pdf`에서 관련 정보 검색
  - 신뢰할 수 있는 의학적 근거 기반 작성
  
- 📖 **자동 출처 표기**
  - 출처: 노윤우 박사
  - 참조 페이지 자동 추적 및 표시
  - 전문성과 신뢰성 강화

---

## 🚀 빠른 시작

### 필수 요구사항
- Node.js 18.x 이상
- npm 9.x 이상
- Gemini API 키 ([무료 발급](https://aistudio.google.com/app/apikey))

### 설치 및 실행

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 설정 (.env.local 파일 생성)
echo "GEMINI_API_KEY=your_api_key_here" > .env.local

# 3. 개발 서버 실행
npm run dev
```

서버가 실행되면 브라우저에서 `http://localhost:3000`으로 접속하세요.

📖 **상세한 실행 가이드**: [run.md](./run.md) 문서를 참고하세요.

---

## 📖 사용 방법

### 1️⃣ 주제 선정
- **자동 추천**: AI가 카테고리별로 인기 주제 제안
- **메모 기반**: 아이디어나 초안을 업로드하여 주제 생성
- **트렌드 분석**: 실시간 검색어 및 트렌드 확인

### 2️⃣ 콘텐츠 생성
1. 블로그 주제 입력
2. 컬러 테마 선택
3. 고급 옵션 설정
   - 이미지 자동 생성 여부
   - 썸네일 텍스트 추가
   - 인터랙티브 요소 포함
4. **생성 버튼 클릭**

### 3️⃣ 편집 및 다운로드
- 미리보기/HTML 모드 전환
- 이미지 재생성 가능
- SEO 제목 및 키워드 복사
- 소셜 미디어 포스트 활용

### 🩺 탈모 전문 콘텐츠 작성
1. 주제에 탈모 관련 키워드 입력 (예: "미녹시딜 효과")
2. 시스템이 자동으로 감지하여 파란색 알림 표시
3. `book.pdf`의 전문 자료를 우선 참조하여 신뢰성 있는 콘텐츠 생성
4. 콘텐츠 하단에 출처 자동 표기

**지원 키워드**: 탈모, 모발, 두피, 피나스테리드, 미녹시딜, 모발 이식 등

**출처 표기 예시**:
```
📚 참고 자료
출처: 전문의 노윤우 원장
인용 페이지: 12p, 15p, 23p (클릭 시 해당 페이지로 이동)
```

**새로운 기능**:
- 📍 각 페이지 번호를 클릭하면 전용 PDF 뷰어로 이동
- 🎯 자동으로 해당 페이지가 표시됨
- 🔍 확대/축소 기능
- ⌨️ 키보드 화살표로 페이지 이동

---

## 🛠️ 기술 스택

- **Frontend**: React 19.1.0, TypeScript 5.8
- **Build Tool**: Vite 6.2.0
- **AI**: Google Gemini 2.5 Flash
- **Image Generation**: Google Imagen 4.0
- **PDF Processing**: PDF.js
- **Styling**: Tailwind CSS

---

## 📁 프로젝트 구조

```
medalo-blog-generator/
├── public/
│   └── book.pdf              # 전문 의학 자료
├── services/
│   ├── geminiService.ts      # AI 콘텐츠 생성
│   ├── pdfService.ts         # PDF 처리 및 검색
│   └── keywordService.ts     # 키워드 분석
├── components/
│   ├── CurrentStatus.tsx     # 상태 표시
│   ├── Shortcuts.tsx         # 트렌드 바로가기
│   └── ...
├── App.tsx                   # 메인 애플리케이션
├── index.html               # HTML 진입점
├── README.md                # 프로젝트 소개
└── run.md                   # 실행 가이드
```

---

## 🔧 추가 명령어

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

---

## 📝 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

---

## 🤝 기여

이슈 및 풀 리퀘스트는 언제나 환영합니다!

---

## 📞 문의

문제가 발생하거나 궁금한 점이 있으시면:
1. GitHub Issues 등록
2. [run.md](./run.md)의 문제 해결 섹션 참고

---

<div align="center">

**Made with ❤️ by MedAlo**

</div>
