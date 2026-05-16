"use client";

import { useEffect, useMemo, useState } from "react";
import { LearningCallout } from "@/components/learning/LearningCallout";
import { PortfolioSummary } from "@/components/portfolio/PortfolioSummary";
import { WalletExperiment } from "@/components/wallet/WalletExperiment";
import { formatCredits, formatProbability, formatShortDate } from "@/lib/format";
import { applyTrade, calculateYesProbability, createDefaultPortfolio, getPosition, settleMarket } from "@/lib/market-engine";
import { loadMarketState, loadPortfolio, resetLabStorage, saveMarketState, savePortfolio } from "@/lib/portfolio-store";
import type { Market, Outcome, Portfolio } from "@/types/market";

interface TradePanelProps {
  initialMarket: Market;
}

export function TradePanel({ initialMarket }: TradePanelProps) {
  const [market, setMarket] = useState(initialMarket);
  const [portfolio, setPortfolio] = useState<Portfolio>(() => createDefaultPortfolio());
  const [stake, setStake] = useState(25);
  const [message, setMessage] = useState("YES 또는 NO를 플레이 크레딧으로 선택해 장난감 확률이 어떻게 움직이는지 확인하세요.");
  const yesProbability = calculateYesProbability(market);
  const position = useMemo(() => getPosition(portfolio, market.slug), [portfolio, market.slug]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setPortfolio(loadPortfolio());
      setMarket(loadMarketState(initialMarket));
    }, 0);

    return () => window.clearTimeout(handle);
  }, [initialMarket]);

  function trade(outcome: Outcome) {
    try {
      const result = applyTrade({ market, portfolio, outcome, stake });
      setMarket(result.market);
      setPortfolio(result.portfolio);
      saveMarketState(result.market);
      savePortfolio(result.portfolio);
      setMessage(
        `${outcome.toUpperCase()} 거래에 ${formatCredits(stake)}을 사용했습니다. YES 확률이 ${formatProbability(
          result.transaction.probabilityBefore,
        )}에서 ${formatProbability(result.transaction.probabilityAfter)}로 움직였습니다.`,
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "데모 거래를 적용할 수 없습니다.");
    }
  }

  function resolve(outcome: Outcome) {
    const result = settleMarket({ market, portfolio, outcome });
    setMarket(result.market);
    setPortfolio(result.portfolio);
    saveMarketState(result.market);
    savePortfolio(result.portfolio);
    setMessage(
      `모의 정산 결과가 ${outcome.toUpperCase()}로 확정되어 ${formatCredits(
        result.settlement.payout,
      )}을 지급했습니다. 이 동작은 플레이 크레딧 전용입니다.`,
    );
  }

  function reset() {
    resetLabStorage(initialMarket.slug);
    setMarket(initialMarket);
    setPortfolio(createDefaultPortfolio());
    setMessage("실험 상태를 초기화했습니다. 1,000 플레이 크레딧과 시드 마켓 상태로 돌아갑니다.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_24rem]">
      <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-slate-950/40">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-200">{market.category}</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-white md:text-5xl">{market.title}</h1>
          </div>
          <div className="rounded-3xl bg-slate-950/50 p-5 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">YES 확률</p>
            <p className="mt-2 text-4xl font-black text-emerald-200" data-testid="yes-probability">
              {formatProbability(yesProbability)}
            </p>
          </div>
        </div>
        <p className="max-w-4xl text-lg leading-8 text-slate-300">{market.description}</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Info label="마감" value={formatShortDate(market.closesAt)} />
          <Info label="플레이 거래량" value={formatCredits(market.playVolume)} />
          <Info label="상태" value={market.status === "resolved" ? `정산 완료: ${market.resolvedOutcome?.toUpperCase()}` : "열린 데모"} />
        </div>
        <div className="mt-6 rounded-3xl bg-slate-950/45 p-5">
          <h2 className="text-lg font-bold text-white">단순화된 거래 패널</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            이 장난감 모델은 여러분의 플레이 크레딧 지분을 YES 또는 NO 풀에 더합니다. 실제 거래소나 오더북이 아니라 방향성과 피드백 루프를 배우기 위한 구조입니다.
          </p>
          <label className="mt-5 block text-sm font-semibold text-slate-200" htmlFor="stake-input">
            지분 금액
          </label>
          <input
            id="stake-input"
            aria-label="지분 금액"
            type="number"
            min="1"
            max={portfolio.balance}
            value={stake}
            onChange={(event) => setStake(Number(event.target.value))}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-200"
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => trade("yes")}
              disabled={market.status === "resolved"}
              className="rounded-2xl bg-emerald-300 px-5 py-4 font-black text-slate-950 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-45"
            >
              YES 사기
            </button>
            <button
              type="button"
              onClick={() => trade("no")}
              disabled={market.status === "resolved"}
              className="rounded-2xl bg-rose-300 px-5 py-4 font-black text-slate-950 transition hover:bg-rose-200 disabled:cursor-not-allowed disabled:opacity-45"
            >
              NO 사기
            </button>
          </div>
          <div className="mt-4 rounded-2xl border border-cyan-200/20 bg-cyan-200/10 p-4 text-sm leading-6 text-cyan-50" role="status">
            {message}
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => resolve("yes")}
            className="rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 text-sm font-bold text-white hover:border-emerald-200/60"
          >
            데모를 YES로 정산하기
          </button>
          <button
            type="button"
            onClick={() => resolve("no")}
            className="rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 text-sm font-bold text-white hover:border-rose-200/60"
          >
            데모를 NO로 정산하기
          </button>
        </div>
        {market.resolvedOutcome ? (
          <div className="mt-5 rounded-3xl border border-emerald-200/20 bg-emerald-200/10 p-5" data-testid="settlement-result">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">모의 정산</p>
            <p className="mt-2 text-lg text-white">
              확정 결과: <strong>{market.resolvedOutcome.toUpperCase()}</strong>. 지급은 플레이 크레딧만 사용합니다.
            </p>
          </div>
        ) : null}
        <button type="button" onClick={reset} className="mt-5 text-sm font-semibold text-cyan-200 underline underline-offset-4">
          이 실험 상태 초기화
        </button>
      </section>
      <aside className="space-y-6">
        <PortfolioSummary portfolio={portfolio} marketSlug={market.slug} />
        <section className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">현재 포지션</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            YES: <strong className="text-emerald-100">{formatCredits(position.yesStake)}</strong>
            <br />
            NO: <strong className="text-rose-100">{formatCredits(position.noStake)}</strong>
          </p>
        </section>
        <section className="rounded-3xl border border-white/10 bg-slate-950/45 p-5" aria-label="최근 데모 거래">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">최근 데모 거래</p>
          {portfolio.transactions.length > 0 ? (
            <ol className="mt-4 space-y-3" data-testid="trade-history">
              {portfolio.transactions
                .filter((transaction) => transaction.marketSlug === market.slug)
                .slice(0, 4)
                .map((transaction) => (
                  <li key={transaction.id} className="rounded-2xl bg-white/[0.06] p-3 text-sm leading-6 text-slate-200">
                    <strong className={transaction.outcome === "yes" ? "text-emerald-100" : "text-rose-100"}>
                      {transaction.outcome.toUpperCase()}
                    </strong>{" "}
                    에 {formatCredits(transaction.stake)}을 사용해 YES가 {formatProbability(transaction.probabilityBefore)}에서 {" "}
                    {formatProbability(transaction.probabilityAfter)}로 움직였습니다.
                  </li>
                ))}
            </ol>
          ) : (
            <p className="mt-3 text-sm leading-6 text-slate-400">아직 데모 거래가 없습니다. YES 또는 NO 거래를 만들어 기록을 남겨보세요.</p>
          )}
        </section>
        <WalletExperiment />
        <LearningCallout title="거래 뒤에는 무엇이 바뀌나요?">
          <p>
            YES 지분은 가상 YES 풀을 키워 표시 확률을 올립니다. NO 지분은 NO 풀을 키워 YES 확률을 낮춥니다. 실제 오더북보다 의도적으로 단순한 학습 모델입니다.
          </p>
        </LearningCallout>
      </aside>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-950/45 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-1 font-bold text-white">{value}</p>
    </div>
  );
}
