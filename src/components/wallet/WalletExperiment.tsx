"use client";

import { useMemo, useState } from "react";

function createDemoAddress(): string {
  const random = Math.random().toString(16).slice(2, 10).padEnd(8, "0");
  return `0xDEMO${random.toUpperCase()}EDU`;
}

export function WalletExperiment() {
  const [connected, setConnected] = useState(false);
  const address = useMemo(() => createDemoAddress(), []);

  return (
    <section className="rounded-3xl border border-amber-200/20 bg-amber-200/10 p-5" aria-label="Mock wallet experiment">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-100">Mock wallet experiment</p>
      <h3 className="mt-3 text-xl font-bold text-white">A safe wallet taste without mainnet</h3>
      <p className="mt-3 text-sm leading-6 text-amber-50/85">
        This is a generated demo address only. It never asks for a seed phrase, never signs a transaction, and never connects to
        mainnet. Core market mechanics work without this experiment.
      </p>
      <button
        type="button"
        onClick={() => setConnected((value) => !value)}
        className="mt-5 rounded-full bg-amber-200 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-100"
      >
        {connected ? "Disconnect mock wallet" : "Connect mock wallet"}
      </button>
      <div className="mt-4 rounded-2xl bg-slate-950/45 p-4 text-sm text-amber-50" data-testid="mock-wallet-status">
        {connected ? (
          <p>
            Connected demo address: <span className="font-mono font-bold">{address}</span>
          </p>
        ) : (
          <p>Not connected. The trading simulation is still fully available.</p>
        )}
      </div>
    </section>
  );
}
