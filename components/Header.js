export const Header = ({ loading }) => (
  <div className="navbar bg-slate-800 rounded-lg shadow-lg">
    {loading ? (
      <div
        className="text-2xl font-comforta font-semibold 
      bg-gradient-to-r bg-clip-text  text-transparent 
      from-slate-200 via-teal-800 to-slate-200 tracking-widest
      animate-text
      "
      >
        MovieBERT
      </div>
    ) : (
      <a className="btn btn-ghost normal-case font-comforta transition-opacity text-teal-50 text-xl">
        MovieBERT
      </a>
    )}
  </div>
);
