# 📊 사용자 활동 추적 시스템

## 개요

MedAlo Blog 생성기는 로컬스토리지 기반의 사용자 활동 추적 시스템을 갖추고 있습니다. 백엔드 없이도 사용자별 로그인 이력, 사용 시간, 통계를 기록하고 대시보드에서 시각화할 수 있습니다.

## 🎯 주요 기능

### 1. 자동 로그 기록
- ✅ 로그인 시간 자동 기록
- ✅ 로그아웃 시간 자동 기록
- ✅ 세션별 사용 시간 계산
- ✅ 사용자 ID별 분류

### 2. 데이터 저장
- **저장 위치**: 브라우저 로컬스토리지
- **저장 키**: `medalo_usage_logs`
- **데이터 형식**: JSON

### 3. 통계 분석
- 📅 일별 통계
- 📆 주별 통계
- 📊 월별 통계
- 👥 사용자별 필터링

## 📋 데이터 구조

```json
{
  "userId": "fintech01",
  "loginTime": "2025-11-15T10:30:00.000Z",
  "logoutTime": "2025-11-15T12:45:00.000Z",
  "duration": 8100000,
  "date": "2025-11-15"
}
```

### 필드 설명
- `userId`: 사용자 ID
- `loginTime`: 로그인 시간 (ISO 8601)
- `logoutTime`: 로그아웃 시간 (ISO 8601, 진행 중이면 null)
- `duration`: 사용 시간 (밀리초)
- `date`: 날짜 (YYYY-MM-DD)

## 🎨 대시보드 기능

### 접근 방법
1. 로그인 후 헤더 오른쪽 상단의 📊 아이콘 클릭
2. 또는 직접 `/dashboard.html` 접속

### 대시보드 화면 구성

#### 1. 통계 카드
- **총 사용자 수**: 등록된 사용자 수
- **총 로그인 횟수**: 전체 로그인 세션 수
- **총 사용 시간**: 누적 사용 시간
- **평균 세션 시간**: 세션당 평균 사용 시간

#### 2. 필터 및 컨트롤
- **사용자 필터**: 특정 사용자만 보기
- **통계 유형**: 일별/주별/월별 선택
- **데이터 내보내기**: JSON 파일로 다운로드
- **데이터 삭제**: 모든 로그 삭제

#### 3. 차트
- **로그인 횟수 차트**: 막대 그래프
- **사용 시간 차트**: 라인 그래프

#### 4. 상세 테이블
- 모든 로그 기록을 테이블로 표시
- 최신순 정렬
- 실시간 업데이트 (5초마다)

## 💻 사용 예시

### 데이터 조회 (JavaScript)
```javascript
import { getAllLogs, getLogsByUser, getDailyStats } from './services/usageLogger';

// 모든 로그 조회
const allLogs = getAllLogs();

// 특정 사용자 로그
const userLogs = getLogsByUser('fintech01');

// 일별 통계
const dailyStats = getDailyStats();
```

### 데이터 내보내기
```javascript
import { exportLogsAsJson } from './services/usageLogger';

// JSON 파일로 다운로드
exportLogsAsJson();
```

### 데이터 삭제
```javascript
import { clearAllLogs } from './services/usageLogger';

// 모든 로그 삭제
clearAllLogs();
```

## 📊 통계 분석

### 일별 통계
```javascript
import { getDailyStats } from './services/usageLogger';

const stats = getDailyStats();
// [
//   {
//     date: '2025-11-15',
//     count: 5,
//     totalDuration: 3600000,
//     averageDuration: 720000
//   },
//   ...
// ]
```

### 주별 통계
```javascript
import { getWeeklyStats } from './services/usageLogger';

const stats = getWeeklyStats('fintech01');
```

### 월별 통계
```javascript
import { getMonthlyStats } from './services/usageLogger';

const stats = getMonthlyStats();
```

## 🔒 보안 고려사항

### 로컬스토리지 특성
- ✅ **장점**: 서버 없이 데이터 저장 가능
- ⚠️ **주의**: 브라우저 캐시 삭제 시 데이터 손실
- ⚠️ **주의**: 동일 브라우저에서만 접근 가능
- ⚠️ **주의**: 약 5-10MB 저장 제한

### 권장사항
1. **정기적 백업**: 데이터 내보내기 기능 사용
2. **서버 이관**: 중요한 데이터는 서버로 이관 권장
3. **브라우저 설정**: 캐시 자동 삭제 비활성화

## 🚀 고급 활용

### 1. 데이터 분석
```javascript
// 사용률이 가장 높은 사용자 찾기
const logs = getAllLogs();
const userStats = {};

logs.forEach(log => {
  if (!userStats[log.userId]) {
    userStats[log.userId] = { count: 0, totalDuration: 0 };
  }
  userStats[log.userId].count++;
  userStats[log.userId].totalDuration += log.duration;
});

const topUser = Object.entries(userStats)
  .sort((a, b) => b[1].totalDuration - a[1].totalDuration)[0];

console.log('최다 사용자:', topUser[0]);
```

### 2. 커스텀 리포트
```javascript
// 특정 기간 데이터
import { getLogsByDateRange } from './services/usageLogger';

const logs = getLogsByDateRange('2025-11-01', '2025-11-30');
```

### 3. 시간대별 분석
```javascript
const logs = getAllLogs();
const hourlyStats = {};

logs.forEach(log => {
  const hour = new Date(log.loginTime).getHours();
  if (!hourlyStats[hour]) hourlyStats[hour] = 0;
  hourlyStats[hour]++;
});

console.log('시간대별 로그인:', hourlyStats);
```

## 🛠️ 트러블슈팅

### 문제: 대시보드에 데이터가 표시되지 않음
**해결책**:
1. 로그인했는지 확인
2. 브라우저 개발자 도구 → Application → Local Storage 확인
3. `medalo_usage_logs` 키가 있는지 확인

### 문제: 로그아웃 시간이 기록되지 않음
**해결책**:
- 브라우저를 강제 종료하면 로그아웃이 기록되지 않습니다
- 반드시 로그아웃 버튼을 클릭하세요

### 문제: 데이터가 너무 많아서 느림
**해결책**:
1. 데이터 내보내기로 백업
2. 데이터 삭제로 초기화
3. 또는 오래된 데이터만 필터링

## 📈 향후 개선 계획

- [ ] 서버 연동 옵션 추가
- [ ] 엑셀 내보내기 기능
- [ ] 더 많은 차트 타입
- [ ] 이메일 리포트 기능
- [ ] 알림 기능

## 📞 지원

문제가 발생하면 개발팀에 문의하세요.

---

**Made by MedAlo** 📊

