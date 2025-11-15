# 🚀 MedAlo Blog 생성기 - 배포 가이드

## 📋 개요

이 애플리케이션은 로그인 인증 시스템이 적용되어 있으며, 서버에 배포하여 사용할 수 있습니다.

## 🔐 보안 기능

### 1. 사용자 인증
- **허용된 사용자 목록**:
  - `fintech01`
  - `gh01`
  - `mg01`
  - `samsung01`
- **공통 비밀번호**: `!@2204!@`

### 2. API 키 관리
- 각 사용자가 로그인 시 자신의 Gemini API 키를 입력
- API 키는 세션 스토리지에 저장 (브라우저 탭 닫으면 자동 삭제)
- 서버에 API 키를 저장하지 않음 (보안)

## 🛠️ 배포 방법

### 1. 프로젝트 빌드

```bash
npm install
npm run build
```

### 2. 환경 변수 설정 (선택사항)

`.env` 파일은 더 이상 필수가 아닙니다. 사용자가 로그인 시 직접 API 키를 입력합니다.

만약 기본 API 키를 설정하고 싶다면:

```env
API_KEY=your_default_gemini_api_key
```

### 3. 서버 배포 옵션

#### A. Vercel 배포

1. Vercel 계정 생성
2. GitHub 저장소 연결
3. 자동 배포 설정

```bash
npm install -g vercel
vercel
```

#### B. Netlify 배포

1. Netlify 계정 생성
2. GitHub 저장소 연결
3. Build 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`

#### C. 일반 서버 (Node.js)

```bash
# 빌드
npm run build

# 서버 실행 (preview)
npm run preview
```

또는 `dist` 폴더를 Nginx나 Apache 웹서버에 배포

### 4. Nginx 설정 예시

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/blog/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip 압축
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

## 🔒 보안 권장사항

### 프로덕션 환경

1. **HTTPS 사용 필수**
   - Let's Encrypt로 무료 SSL 인증서 발급
   - HTTP는 HTTPS로 자동 리다이렉트

2. **비밀번호 변경**
   - `components/Login.tsx` 파일에서 비밀번호 변경
   - 더 강력한 비밀번호 사용 권장

```typescript
const ALLOWED_USERS = [
  { id: 'fintech01', password: 'your_strong_password_1' },
  { id: 'gh01', password: 'your_strong_password_2' },
  // ...
];
```

3. **사용자 관리 개선 (옵션)**
   - 백엔드 API 구축하여 사용자 인증 처리
   - JWT 토큰 기반 인증 시스템 도입
   - 데이터베이스에 사용자 정보 저장

4. **API 키 보안**
   - 사용자에게 개인 API 키 사용 교육
   - API 키는 절대 공유하지 않도록 안내
   - Google Cloud Console에서 API 키 제한 설정

## 📱 사용 방법

1. 배포된 URL 접속
2. 로그인 화면에서 ID/Password 입력
3. Gemini API 키 입력
4. 블로그 생성 시작

## 🔑 Gemini API 키 발급

1. [Google AI Studio](https://aistudio.google.com/app/apikey) 접속
2. Google 계정 로그인
3. "Create API Key" 클릭
4. 생성된 API 키 복사 (AIza...로 시작)

## ⚠️ 주의사항

1. **세션 관리**
   - 브라우저 탭을 닫으면 자동 로그아웃됩니다
   - 새로고침 시에는 로그인 상태가 유지됩니다

2. **API 키 유출 방지**
   - API 키를 절대 공개 저장소에 커밋하지 마세요
   - `.env` 파일은 `.gitignore`에 포함되어 있습니다

3. **API 사용량**
   - Gemini API는 무료 할당량 초과 시 과금됩니다
   - [요금제 확인](https://ai.google.dev/pricing)

## 🐛 트러블슈팅

### "API_KEY environment variable is not set" 오류
- 로그인 화면에서 올바른 Gemini API 키를 입력했는지 확인
- API 키 형식이 "AIza"로 시작하는지 확인

### 로그인 후 빈 화면
- 브라우저 콘솔에서 에러 확인
- 세션 스토리지가 활성화되어 있는지 확인

### API 호출 실패
- API 키가 유효한지 확인
- Google Cloud Console에서 Gemini API가 활성화되어 있는지 확인
- API 사용량 할당량을 초과하지 않았는지 확인

## 📞 지원

문제가 발생하면 개발팀에 문의하세요.

---

**Made by MedAlo** 🚀

