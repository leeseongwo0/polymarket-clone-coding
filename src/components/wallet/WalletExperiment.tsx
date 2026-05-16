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
    <section className="rounded-3xl border border-amber-200/20 bg-amber-200/10 p-5" aria-label="목업 지갑 실험">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-100">목업 지갑 실험</p>
      <h3 className="mt-3 text-xl font-bold text-white">메인넷 없이 안전하게 맛보는 지갑 UX</h3>
      <p className="mt-3 text-sm leading-6 text-amber-50/85">
        이 주소는 화면에서 생성한 데모 주소일 뿐입니다. 시드 문구를 요구하지 않고, 서명하지 않으며, 메인넷에 연결하지 않습니다. 핵심 마켓 실험은 이 기능 없이도 동작합니다.
      </p>
      <button
        type="button"
        onClick={() => setConnected((value) => !value)}
        className="mt-5 rounded-full bg-amber-200 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-100"
      >
        {connected ? "목업 지갑 연결 해제" : "목업 지갑 연결"}
      </button>
      <div className="mt-4 rounded-2xl bg-slate-950/45 p-4 text-sm text-amber-50" data-testid="mock-wallet-status">
        {connected ? (
          <p>
            연결된 데모 주소: <span className="font-mono font-bold">{address}</span>
          </p>
        ) : (
          <p>연결되지 않았습니다. 그래도 거래 시뮬레이션은 모두 사용할 수 있습니다.</p>
        )}
      </div>
    </section>
  );
}
