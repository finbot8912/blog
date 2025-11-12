# MedAlo Blog 생성 가이즈 실행 가이드

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 Gemini API 키를 입력합니다:

```env
GEMINI_API_KEY=여기에_API_키_입력
```

> 💡 **API 키 발급 방법**: [Google AI Studio](https://aistudio.google.com/app/apikey)에서 무료로 발급받을 수 있습니다.

### 3. 개발 서버 실행
```bash
npm run dev
```

서버가 실행되면 브라우저에서 `http://localhost:3000`으로 접속하세요.

---

## 📋 상세 명령어

### 개발 모드 실행
```bash
npm run dev
```
- **설명**: 개발 서버를 시작합니다 (Hot reload 지원)
- **접속 주소**: http://localhost:3000
- **네트워크 접속**: http://0.0.0.0:3000 (같은 네트워크의 다른 기기에서 접속 가능)

### 프로덕션 빌드
```bash
npm run build
```
- **설명**: 프로덕션용으로 최적화된 빌드를 생성합니다
- **출력 폴더**: `dist/`

### 빌드 미리보기
```bash
npm run preview
```
- **설명**: 빌드된 프로덕션 버전을 로컬에서 미리 확인합니다

---

## ⚙️ 시스템 요구사항

- **Node.js**: 18.x 이상 권장
- **npm**: 9.x 이상
- **브라우저**: Chrome, Firefox, Safari, Edge (최신 버전)

---

## 🔧 문제 해결

### 1. 포트 충돌 오류
```bash
Error: Port 3000 is already in use
```

**해결 방법**:
- 다른 프로그램이 3000 포트를 사용 중입니다
- `vite.config.ts`에서 포트를 변경하거나
- 기존 프로세스를 종료하세요

### 2. API 키 오류
```bash
Error: API_KEY environment variable is not set
```

**해결 방법**:
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 파일 내용: `GEMINI_API_KEY=your_api_key_here`
- 서버 재시작

### 3. PDF 로딩 오류
```bash
Error: Failed to load PDF
```

**해결 방법**:
- `public/book.pdf` 파일이 존재하는지 확인
- 파일 경로가 올바른지 확인
- 브라우저 콘솔에서 상세 오류 확인

### 4. 의존성 설치 오류
```bash
npm install
```
실행 후 오류 발생 시:

```bash
# 캐시 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

---

## 📱 모바일/외부 기기에서 접속

1. PC의 IP 주소 확인:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`

2. 같은 Wi-Fi에 연결된 모바일 기기에서:
   ```
   http://[PC_IP_주소]:3000
   ```
   예: `http://192.168.0.10:3000`

---

## 🔐 보안 주의사항

⚠️ **중요**: `.env.local` 파일은 절대 Git에 커밋하지 마세요!

- `.gitignore`에 이미 추가되어 있습니다
- API 키는 개인정보이므로 공개하지 마세요

---

## 📚 추가 정보

- [Gemini API 문서](https://ai.google.dev/docs)
- [Vite 문서](https://vitejs.dev/)
- [React 문서](https://react.dev/)

---

## 💬 지원

문제가 계속되면 다음 정보와 함께 문의하세요:
- 운영체제 버전
- Node.js 버전 (`node -v`)
- npm 버전 (`npm -v`)
- 오류 메시지 전문

