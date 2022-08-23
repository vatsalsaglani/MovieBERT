import Link from "next/link";
import { urls } from "../urls";

export const MovieCard = ({ movie, onRemove }) => {
  // console.log("MOVIE CARD: ", movie)
  return (
    <Link href={`/movies/${movie.id}`} target="_blank">
      <a
        className={`relative block   overflow-hidden rounded-2xl ${
          movie?.isRecommended
            ? "border border-green-400 border-dashed hover:border-green-700 hover:border-2"
            : "hover:ring hover:ring-teal-100"
        }`}
        target={"_blank"}
      >
        <img
          className="object-cover w-full"
          src={`${urls.img_url}${movie?.Posters[0]?.path}`}
          // src={`https://image.tmdb.org/t/p/original${movie?.Posters[0]?.path}`}
          alt=""
        />

        <div className="p-4 bg-slate-800 flex flex-row justify-between items-center">
          <div className="text-xl font-comforta text-teal-50">
            {movie.Meta[0].title}
          </div>
          {onRemove ? (
            <button
              onClick={(e) => onRemove(e, movie)}
              className="inline-block p-1 text-slate-200 border border-slate-200 rounded-full hover:text-white hover:bg-slate-600 active:bg-red-400 focus:outline-none focus:ring"
            >
              <span className="sr-only"> Download </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : null}
        </div>
      </a>
    </Link>
  );
};
