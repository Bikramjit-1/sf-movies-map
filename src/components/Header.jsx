function Header() {
  return (
    <div className="grid grid-cols-[64px_1fr] gap-4">
      <span
        className="grid h-16 w-16 place-items-center rounded-lg bg-orange-600 text-xl font-black text-white shadow-lg shadow-orange-950/40"
        aria-hidden="true"
      >
        SF
      </span>
      <div>
        <h1 className="text-4xl font-black leading-none !text-white">SF Movies</h1>
        <p className="mt-3 leading-6 text-slate-300">
         Search movies, discover filming locations, and visualize them on an interactive map.
        </p>
      </div>
    </div>
  );
}

export default Header;
