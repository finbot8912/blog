import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: (userId: string, apiKey: string) => void;
}

// 허용된 사용자 목록
const ALLOWED_USERS = [
  { id: 'fintech01', password: '!@2204!@' },
  { id: 'gh01', password: '!@2204!@' },
  { id: 'mg01', password: '!@2204!@' },
  { id: 'samsung01', password: '!@2204!@' },
  { id: 'hjs01', password: '!@3730!@' },
  { id: 'hjs02', password: '!@3730!@' },
];

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [step, setStep] = useState<'login' | 'apikey'>('login');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [tempUserId, setTempUserId] = useState('');

  // 로그인 검증
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = ALLOWED_USERS.find(
      (u) => u.id === userId && u.password === password
    );

    if (user) {
      setTempUserId(userId);
      setStep('apikey');
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  // API 키 제출
  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!apiKey || apiKey.trim().length === 0) {
      setError('Gemini API 키를 입력해주세요.');
      return;
    }

    // API 키 형식 간단 검증 (Gemini API 키는 보통 "AIza"로 시작)
    if (!apiKey.startsWith('AIza')) {
      setError('올바른 Gemini API 키 형식이 아닙니다. API 키는 "AIza"로 시작해야 합니다.');
      return;
    }

    // 로그인 성공
    onLoginSuccess(tempUserId, apiKey);
  };

  // 뒤로가기
  const handleBack = () => {
    setStep('login');
    setApiKey('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* 로그인 단계 */}
        {step === 'login' && (
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                MedAlo Blog 생성기
              </h1>
              <p className="text-gray-400">로그인이 필요합니다</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* 사용자 ID */}
              <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-300 mb-2">
                  사용자 ID
                </label>
                <input
                  type="text"
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="아이디를 입력하세요"
                  required
                />
              </div>

              {/* 비밀번호 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-12"
                    placeholder="비밀번호를 입력하세요"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* 에러 메시지 */}
              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* 로그인 버튼 */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                다음 단계로
              </button>
            </form>

            {/* 안내 메시지 */}
            <div className="mt-6 text-center text-sm text-gray-400">
              <p>접근 권한이 필요합니다</p>
            </div>
          </div>
        )}

        {/* API 키 입력 단계 */}
        {step === 'apikey' && (
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                환영합니다, {tempUserId}님
              </h1>
              <p className="text-gray-400">Gemini API 키를 입력해주세요</p>
            </div>

            <form onSubmit={handleApiKeySubmit} className="space-y-6">
              {/* API 키 */}
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-2">
                  Gemini API Key
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-12 font-mono text-sm"
                    placeholder="AIza..."
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showApiKey ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  💡 Gemini API 키는 <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google AI Studio</a>에서 발급받을 수 있습니다.
                </p>
              </div>

              {/* 에러 메시지 */}
              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* 버튼 그룹 */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 bg-gray-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-600 transition-all duration-200"
                >
                  뒤로
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
                >
                  시작하기
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

