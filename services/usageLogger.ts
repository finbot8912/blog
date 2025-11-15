// 사용자 로그인 이력 관리 서비스

export interface UsageLog {
  userId: string;
  loginTime: string; // ISO 8601 형식
  logoutTime: string | null; // ISO 8601 형식
  duration: number; // 밀리초 단위
  date: string; // YYYY-MM-DD
}

const STORAGE_KEY = 'medalo_usage_logs';

// 로컬 스토리지에서 모든 로그 가져오기
export const getAllLogs = (): UsageLog[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error('로그 데이터 읽기 실패:', error);
    return [];
  }
};

// 로그 저장
const saveLogs = (logs: UsageLog[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error('로그 저장 실패:', error);
  }
};

// 로그인 기록
export const recordLogin = (userId: string): void => {
  const now = new Date();
  const newLog: UsageLog = {
    userId,
    loginTime: now.toISOString(),
    logoutTime: null,
    duration: 0,
    date: now.toISOString().split('T')[0], // YYYY-MM-DD
  };

  const logs = getAllLogs();
  logs.push(newLog);
  saveLogs(logs);

  // 세션 스토리지에 현재 로그 인덱스 저장
  sessionStorage.setItem('current_log_index', String(logs.length - 1));
  
  console.log('✅ 로그인 기록:', newLog);
};

// 로그아웃 기록
export const recordLogout = (): void => {
  const currentLogIndex = sessionStorage.getItem('current_log_index');
  if (!currentLogIndex) {
    console.warn('현재 로그 인덱스를 찾을 수 없습니다.');
    return;
  }

  const logs = getAllLogs();
  const index = parseInt(currentLogIndex, 10);
  
  if (logs[index]) {
    const now = new Date();
    const loginTime = new Date(logs[index].loginTime);
    const duration = now.getTime() - loginTime.getTime();

    logs[index].logoutTime = now.toISOString();
    logs[index].duration = duration;

    saveLogs(logs);
    sessionStorage.removeItem('current_log_index');
    
    console.log('✅ 로그아웃 기록:', logs[index]);
  }
};

// 특정 사용자의 로그만 필터링
export const getLogsByUser = (userId: string): UsageLog[] => {
  return getAllLogs().filter(log => log.userId === userId);
};

// 날짜 범위로 로그 필터링
export const getLogsByDateRange = (startDate: string, endDate: string): UsageLog[] => {
  return getAllLogs().filter(log => {
    return log.date >= startDate && log.date <= endDate;
  });
};

// 일별 통계
export const getDailyStats = (userId?: string) => {
  const logs = userId ? getLogsByUser(userId) : getAllLogs();
  const dailyStats: Record<string, { count: number; totalDuration: number }> = {};

  logs.forEach(log => {
    if (!dailyStats[log.date]) {
      dailyStats[log.date] = { count: 0, totalDuration: 0 };
    }
    dailyStats[log.date].count++;
    dailyStats[log.date].totalDuration += log.duration;
  });

  return Object.entries(dailyStats).map(([date, stats]) => ({
    date,
    count: stats.count,
    totalDuration: stats.totalDuration,
    averageDuration: stats.count > 0 ? stats.totalDuration / stats.count : 0,
  })).sort((a, b) => a.date.localeCompare(b.date));
};

// 주별 통계
export const getWeeklyStats = (userId?: string) => {
  const logs = userId ? getLogsByUser(userId) : getAllLogs();
  const weeklyStats: Record<string, { count: number; totalDuration: number }> = {};

  logs.forEach(log => {
    const date = new Date(log.date);
    const weekStart = getWeekStart(date);
    const weekKey = weekStart.toISOString().split('T')[0];

    if (!weeklyStats[weekKey]) {
      weeklyStats[weekKey] = { count: 0, totalDuration: 0 };
    }
    weeklyStats[weekKey].count++;
    weeklyStats[weekKey].totalDuration += log.duration;
  });

  return Object.entries(weeklyStats).map(([week, stats]) => ({
    week,
    count: stats.count,
    totalDuration: stats.totalDuration,
    averageDuration: stats.count > 0 ? stats.totalDuration / stats.count : 0,
  })).sort((a, b) => a.week.localeCompare(b.week));
};

// 월별 통계
export const getMonthlyStats = (userId?: string) => {
  const logs = userId ? getLogsByUser(userId) : getAllLogs();
  const monthlyStats: Record<string, { count: number; totalDuration: number }> = {};

  logs.forEach(log => {
    const month = log.date.substring(0, 7); // YYYY-MM

    if (!monthlyStats[month]) {
      monthlyStats[month] = { count: 0, totalDuration: 0 };
    }
    monthlyStats[month].count++;
    monthlyStats[month].totalDuration += log.duration;
  });

  return Object.entries(monthlyStats).map(([month, stats]) => ({
    month,
    count: stats.count,
    totalDuration: stats.totalDuration,
    averageDuration: stats.count > 0 ? stats.totalDuration / stats.count : 0,
  })).sort((a, b) => a.month.localeCompare(b.month));
};

// 주의 시작일 계산 (월요일 기준)
const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // 일요일이면 -6, 아니면 월요일로
  return new Date(d.setDate(diff));
};

// 밀리초를 시간 문자열로 변환
export const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}시간 ${minutes % 60}분`;
  } else if (minutes > 0) {
    return `${minutes}분 ${seconds % 60}초`;
  } else {
    return `${seconds}초`;
  }
};

// 로그 데이터 내보내기 (JSON 다운로드)
export const exportLogsAsJson = (): void => {
  const logs = getAllLogs();
  const dataStr = JSON.stringify(logs, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `medalo_usage_logs_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
};

// 모든 로그 삭제 (관리자용)
export const clearAllLogs = (): void => {
  if (confirm('모든 사용 이력을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
    localStorage.removeItem(STORAGE_KEY);
    console.log('✅ 모든 로그가 삭제되었습니다.');
  }
};

