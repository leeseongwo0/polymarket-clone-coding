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
  const [message, setMessage] = useState("Choose YES or NO with play credits to see the toy probability move.");
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
        `${outcome.toUpperCase()} trade used ${formatCredits(stake)}. YES probability moved from ${formatProbability(
          result.transaction.probabilityBefore,
        )} to ${formatProbability(result.transaction.probabilityAfter)}.`,
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The demo trade could not be applied.");
    }
  }

  function resolve(outcome: Outcome) {
    const result = settleMarket({ market, portfolio, outcome });
    setMarket(result.market);
    setPortfolio(result.portfolio);
    saveMarketState(result.market);
    savePortfolio(result.portfolio);
    setMessage(
      `Simulated settlement resolved ${outcome.toUpperCase()} and paid ${formatCredits(
        result.settlement.payout,
      )}. This is play-credit behavior only.`,
    );
  }

  function reset() {
    resetLabStorage(initialMarket.slug);
    setMarket(initialMarket);
    setPortfolio(createDefaultPortfolio());
    setMessage("Lab reset. You are back to 1,000 play credits and the seeded market state.");
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
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">YES probability</p>
            <p className="mt-2 text-4xl font-black text-emerald-200" data-testid="yes-probability">
              {formatProbability(yesProbability)}
            </p>
          </div>
        </div>
        <p className="max-w-4xl text-lg leading-8 text-slate-300">{market.description}</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Info label="Closes" value={formatShortDate(market.closesAt)} />
          <Info label="Play volume" value={formatCredits(market.playVolume)} />
          <Info label="Status" value={market.status === "resolved" ? `Resolved ${market.resolvedOutcome?.toUpperCase()}` : "Open demo"} />
        </div>
        <div className="mt-6 rounded-3xl bg-slate-950/45 p-5">
          <h2 className="text-lg font-bold text-white">Simplified trade panel</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            This toy model adds your play-credit stake to the YES or NO pool. It teaches direction and feedback loops, not a
            production exchange or order book.
          </p>
          <label className="mt-5 block text-sm font-semibold text-slate-200" htmlFor="stake-input">
            Stake amount
          </label>
          <input
            id="stake-input"
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
              Buy YES
            </button>
            <button
              type="button"
              onClick={() => trade("no")}
              disabled={market.status === "resolved"}
              className="rounded-2xl bg-rose-300 px-5 py-4 font-black text-slate-950 transition hover:bg-rose-200 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Buy NO
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
            Resolve demo as YES
          </button>
          <button
            type="button"
            onClick={() => resolve("no")}
            className="rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 text-sm font-bold text-white hover:border-rose-200/60"
          >
            Resolve demo as NO
          </button>
        </div>
        {market.resolvedOutcome ? (
          <div className="mt-5 rounded-3xl border border-emerald-200/20 bg-emerald-200/10 p-5" data-testid="settlement-result">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-100">Simulated settlement</p>
            <p className="mt-2 text-lg text-white">
              Resolved outcome: <strong>{market.resolvedOutcome.toUpperCase()}</strong>. Payouts use play credits only.
            </p>
          </div>
        ) : null}
        <button type="button" onClick={reset} className="mt-5 text-sm font-semibold text-cyan-200 underline underline-offset-4">
          Reset this lab state
        </button>
      </section>
      <aside className="space-y-6">
        <PortfolioSummary portfolio={portfolio} marketSlug={market.slug} />
        <section className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Current position</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            YES: <strong className="text-emerald-100">{formatCredits(position.yesStake)}</strong>
            <br />
            NO: <strong className="text-rose-100">{formatCredits(position.noStake)}</strong>
          </p>
        </section>
        <section className="rounded-3xl border border-white/10 bg-slate-950/45 p-5" aria-label="Recent demo trades">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Recent demo trades</p>
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
                    with {formatCredits(transaction.stake)} moved YES from {formatProbability(transaction.probabilityBefore)} to{" "}
                    {formatProbability(transaction.probabilityAfter)}.
                  </li>
                ))}
            </ol>
          ) : (
            <p className="mt-3 text-sm leading-6 text-slate-400">No demo trades yet. Place a YES or NO trade to create history.</p>
          )}
        </section>
        <WalletExperiment />
        <LearningCallout title="What changed after a trade?">
          <p>
            A YES stake increases the virtual YES pool, so displayed probability rises. A NO stake increases the NO pool, so
            YES probability falls. This is deliberately simpler than a real order book.
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
