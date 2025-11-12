# PDF 참조 디버깅 체크리스트

## 🔍 즉시 확인해야 할 사항

### 1. book.pdf 파일 위치 확인
```bash
# PowerShell에서 실행
Get-ChildItem -Path ".\public\" -Filter "book.pdf"
```

예상 결과:
```
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---        날짜/시간          크기   book.pdf
```

### 2. 브라우저 콘솔 로그 확인

**F12를 눌러 개발자 도구를 열고 Console 탭에서 다음을 확인하세요:**

#### ✅ 정상 작동 시 나타나야 할 로그:
```
탈모 관련 주제 감지됨. book.pdf에서 관련 정보를 검색합니다...
[PDF 검색 시작] 주제: "아내가 임신 중인데 남편인 제가 미녹시딜을 복용..."
[키워드 추출] 아내, 임신, 남편, 미녹시딜, 복용
[확장 키워드] 아내, 임신, 남편, 미녹시딜, 복용, 탈모, 모발, 두피, 치료, 약물, 효과, 부작용
[PDF 로드 완료] 총 X 페이지
[페이지 N] 매칭 점수: X
[검색 완료] 관련 페이지 X개 발견
[최종 결과] 텍스트 길이: XXX자, 참조 페이지: X, X, X
```

#### ❌ 오류 발생 시:
```
[PDF 검색 오류] Error: ...
```

### 3. 네트워크 탭 확인

**F12 → Network 탭에서:**
1. 페이지 새로고침
2. 필터에 "book.pdf" 입력
3. book.pdf 요청 상태 확인
   - ✅ 200 OK: 파일 로드 성공
   - ❌ 404 Not Found: 파일 없음
   - ❌ 다른 오류: 서버 문제

---

## 🛠️ 즉각 조치 방법

### 문제 A: PDF 파일이 없는 경우
```bash
# book.pdf가 public 폴더에 있는지 확인
ls public/book.pdf

# 없다면 다시 복사
Copy-Item "book.pdf" -Destination "public/book.pdf" -Force
```

### 문제 B: PDF 파일은 있지만 로드 실패
```bash
# 서버 재시작
# Ctrl+C로 종료 후
npm run dev
```

### 문제 C: 키워드가 PDF 내용과 매칭되지 않음

**콘솔에서 다음 확인:**
```
[검색 완료] 관련 페이지 0개 발견
```

**해결 방법**: 더 일반적인 키워드로 테스트
- "미녹시딜" → 탈모 관련이므로 감지됨
- "미녹시딜 효과"
- "탈모 치료"
- "두피 관리"

---

## 🧪 빠른 테스트

### 테스트 1: 간단한 주제로 시도
```
미녹시딜
```

### 테스트 2: 콘솔에서 수동 확인
개발자 도구 Console에 다음 입력:
```javascript
// PDF 파일 접근 가능 여부 확인
fetch('/book.pdf')
  .then(res => console.log('PDF 파일 상태:', res.status))
  .catch(err => console.error('PDF 로드 오류:', err));

// 탈모 키워드 감지 확인
console.log('탈모 키워드 감지:', 
  "아내가 임신 중인데 남편인 제가 미녹시딜을 복용해도 될까요?"
    .toLowerCase().includes('미녹시딜'));
```

---

## 📋 문제 보고 시 포함할 정보

문제가 계속되면 다음 정보를 확인해주세요:

1. **book.pdf 파일 존재 여부**
   ```bash
   ls -la public/book.pdf
   ```

2. **브라우저 콘솔 로그 전체**
   - "탈모 관련 주제 감지됨" 메시지가 나타나는지?
   - "[PDF 검색 시작]" 로그가 있는지?
   - 오류 메시지가 있는지?

3. **Network 탭 결과**
   - book.pdf 요청의 HTTP 상태 코드
   - 파일 크기

4. **사용한 정확한 주제**
   - 입력한 전체 텍스트

5. **브라우저 정보**
   - Chrome/Firefox/Edge 등
   - 버전

---

## 💡 예상 원인과 해결

### 원인 1: book.pdf가 실제로 public 폴더에 없음
**해결**: 
```bash
Copy-Item "book.pdf" -Destination "public/book.pdf" -Force
```

### 원인 2: PDF가 텍스트가 아닌 이미지로만 구성
**확인**: PDF를 열어 텍스트 복사가 가능한지 확인
**해결**: OCR 처리된 텍스트 PDF 사용

### 원인 3: 브라우저 캐시 문제
**해결**: 
- Ctrl+Shift+R (강력 새로고침)
- 또는 개발자 도구에서 Network 탭 → "Disable cache" 체크

### 원인 4: CORS 또는 보안 정책 문제
**확인**: 콘솔에 CORS 오류가 있는지 확인
**해결**: PDF가 동일 도메인에서 서비스되는지 확인

---

## ✅ 최종 확인

다음 단계를 순서대로 실행하세요:

1. [ ] `public/book.pdf` 파일 존재 확인
2. [ ] 서버 재시작 (`npm run dev`)
3. [ ] 브라우저 강력 새로고침 (Ctrl+Shift+R)
4. [ ] F12 콘솔 열기
5. [ ] "미녹시딜" 단일 단어로 테스트
6. [ ] 콘솔 로그 확인
7. [ ] Network 탭에서 book.pdf 로드 확인

모든 단계 후에도 작동하지 않으면 스크린샷과 함께 문의해주세요.

