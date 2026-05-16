import { formatCredits } from "@/lib/format";
import { getPosition } from "@/lib/market-engine";
import type { Portfolio } from "@/types/market";

interface PortfolioSummaryProps {
  portfolio: Portfolio;
  marketSlug: string;
}

export function PortfolioSummary({ portfolio, marketSlug }: PortfolioSummaryProps) {
  const position = getPosition(portfolio, marketSlug);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/45 p-5" aria-label="포트폴리오 요약">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">포트폴리오</p>
      <p className="mt-3 text-3xl font-black text-white" data-testid="portfolio-balance">
        {formatCredits(portfolio.balance)}
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <PositionPill label="YES 지분" value={position.yesStake} tone="yes" />
        <PositionPill label="NO 지분" value={position.noStake} tone="no" />
      </div>
    </section>
  );
}

function PositionPill({ label, value, tone }: { label: string; value: number; tone: "yes" | "no" }) {
  const toneClass = tone === "yes" ? "bg-emerald-300/10 text-emerald-100" : "bg-rose-300/10 text-rose-100";

  return (
    <div className={`rounded-2xl p-4 ${toneClass}`}>
      <p className="text-xs uppercase tracking-[0.18em] opacity-70">{label}</p>
      <p className="mt-2 text-lg font-bold">{formatCredits(value)}</p>
    </div>
  );
}
