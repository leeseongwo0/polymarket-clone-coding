import type { Market } from "@/types/market";

export const seedMarkets: Market[] = [
  {
    slug: "ai-assistant-weekly-coding",
    title: "올해 AI 어시스턴트가 초보 개발자의 기본 코딩 도구가 될까요?",
    description:
      "AI와 함께 개발하는 방식이 새 개발자의 자연스러운 첫 단계가 되는지 살펴보는 학습용 마켓입니다. 플레이 크레딧만 쓰는 시뮬레이션이며 조언이 아닙니다.",
    category: "AI와 교육",
    closesAt: "2026-06-30",
    status: "open",
    yesPool: 58,
    noPool: 42,
    playVolume: 1240,
    learningGoal: "YES를 사면 단순화된 확률이 위로 움직이는 과정을 확인합니다.",
  },
  {
    slug: "nextjs-beginner-deploy",
    title: "모든 학습자가 3주 차 끝까지 앱을 배포할 수 있을까요?",
    description: "미래 결과에 대한 자신감을 예측으로 표현하는 방식을 배우기 위한 프로젝트 진행 마켓입니다.",
    category: "프로젝트 마일스톤",
    closesAt: "2026-07-07",
    status: "open",
    yesPool: 64,
    noPool: 36,
    playVolume: 980,
    learningGoal: "팀 마일스톤에 대한 확신을 플레이 크레딧으로 모델링합니다.",
  },
  {
    slug: "demo-settled-market",
    title: "정산 완료 데모: 샘플 기능이 출시되었나요?",
    description: "정산을 배우기 위한 안전한 완료 예시입니다. 실제 자산 없이 플레이 크레딧 지급 원리를 보여줍니다.",
    category: "정산 데모",
    closesAt: "2026-05-01",
    status: "resolved",
    yesPool: 72,
    noPool: 28,
    playVolume: 760,
    resolvedOutcome: "yes",
    learningGoal: "모의 정산이 승리 결과를 어떻게 표시하는지 확인합니다.",
  },
];

export function getMarketBySlug(slug: string): Market | undefined {
  return seedMarkets.find((market) => market.slug === slug);
}
