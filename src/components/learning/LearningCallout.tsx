interface LearningCalloutProps {
  title: string;
  children: React.ReactNode;
}

export function LearningCallout({ title, children }: LearningCalloutProps) {
  return (
    <aside className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-cyan-50 shadow-lg shadow-cyan-950/20">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-200">Learning checkpoint</p>
      <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
      <div className="leading-6 text-cyan-50/85">{children}</div>
    </aside>
  );
}
