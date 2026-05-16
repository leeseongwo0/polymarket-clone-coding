import { MarketCard } from "@/components/market/MarketCard";
import { seedMarkets } from "@/data/markets";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10 md:py-14">
      <section className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-slate-950/30">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-200">시뮬레이션 전용 클론코딩 실험실</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
          실제 돈과 메인넷 위험 없이 예측시장 원리를 배웁니다.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          폴리마켓 메커니즘 실험실은 초보자를 위한 학습용 프로젝트입니다. 데모 마켓을 살펴보고, 플레이 크레딧으로 YES 또는 NO를 선택하며, 확률이 움직이는 이유와 모의 정산, 안전한 목업 지갑 실험을 단계별로 확인합니다.
        </p>
        <div className="mt-6 grid gap-3 text-sm md:grid-cols-3">
          <Badge>3주 초보자 학습 루트</Badge>
          <Badge>메인넷·실거래 없음</Badge>
          <Badge>AI 바이브코딩 연습용</Badge>
        </div>
      </section>
      <section aria-labelledby="markets-heading">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">시드 데모 마켓</p>
            <h2 id="markets-heading" className="mt-2 text-3xl font-black text-white">
              학습할 마켓을 선택하세요
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-400">
            이 앱은 Polymarket과 공식 제휴가 없으며 Polymarket 로고, 브랜드 자산, 실제 돈, 투자 조언을 사용하지 않습니다.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {seedMarkets.map((market) => (
            <MarketCard key={market.slug} market={market} />
          ))}
        </div>
      </section>
    </main>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 font-semibold text-cyan-50">{children}</span>;
}
