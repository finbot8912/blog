import { isHairLossRelated, extractKeywords } from '../pdfService';

/**
 * PDF 서비스 테스트
 * 실제 실행: 콘솔에서 각 테스트 함수 실행 결과 확인
 */

// 탈모 관련 키워드 감지 테스트
console.log('=== 탈모 관련 키워드 감지 테스트 ===');

const testTopics = [
  '탈모 치료의 모든 것',
  '미녹시딜 사용 방법과 주의사항',
  '프로그래밍 입문 가이드',
  'M자 탈모 초기 증상',
  '헤어 이식 후기',
  '맛있는 파스타 만들기',
  '두피 건강 관리법',
];

testTopics.forEach(topic => {
  const isRelated = isHairLossRelated(topic);
  console.log(`"${topic}" => ${isRelated ? '✅ 탈모 관련' : '❌ 일반 주제'}`);
});

console.log('\n테스트 완료!');

// 예상 결과:
// "탈모 치료의 모든 것" => ✅ 탈모 관련
// "미녹시딜 사용 방법과 주의사항" => ✅ 탈모 관련
// "프로그래밍 입문 가이드" => ❌ 일반 주제
// "M자 탈모 초기 증상" => ✅ 탈모 관련
// "헤어 이식 후기" => ✅ 탈모 관련
// "맛있는 파스타 만들기" => ❌ 일반 주제
// "두피 건강 관리법" => ✅ 탈모 관련

