function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.08] p-4 shadow-xl shadow-black/15 backdrop-blur">
      <strong className="block text-2xl font-black leading-none text-white">{value}</strong>
      <span className="mt-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-400">
        {label}
      </span>
    </div>
  );
}

export default Stat;
