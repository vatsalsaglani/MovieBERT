import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Genre } from "../../components/Genre";
import { Header } from "../../components/Header";
import { SwipingCast, SwipingCastSmall } from "../../components/SwipingCast";
import { SwipingCrew, SwipingCrewSmall } from "../../components/SwipingCrew";
import { YouMayLike, YouMayLikeSmall } from "../../components/YouMayLike";
import { OTTProvider } from "../../components/OTTProviders";

const Movie = () => {
  const [movie, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { asPath, pathname } = useRouter();

  useEffect(() => {
    const get_movies = async () => {
      // console.log("GET MOVIES");
      if (asPath.split("/").at(-1) !== "[slug]") {
        let id = parseInt(asPath.split("/").at(-1));
        const resp = await fetch(`/api/get_movies?id=${id}`);
        const data = await resp.json();
        setMovieInfo(data);
        setLoading(false);
      }
    };
    get_movies();
  }, [asPath]);

  // console.log("AS PATH: ", asPath);
  // console.log("PATHNAME: ", pathname);
  // console.log("MOVIES: ", movie);

  return (
    <div className="py-2 px-4 flex flex-col mx-auto min-w-full min-h-screen bg-gradient-to-l from-black via-slate-700 to-black">
      <Header loading={loading} />
      {movie ? (
        <div className="p-2 flex flex-col ">
          <Head>
            <title>{movie.Meta[0].title}</title>
          </Head>
          <div className="p-2 space-y-2 flex flex-col md:flex-row md:justify-around md:items-start ">
            <div className="space-y-2">
              <div className="text-xl mt-2 md:text-3xl font-comforta font-extrabold text-teal-50">
                {movie.Meta[0].title}
              </div>
              <div>
                <Genre genres={movie?.Genre} />
              </div>
              <div className="text-lg flex space-x-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="text-teal-50 font-comforta text-md font-bold">
                  {movie.Meta[0]?.rating.toFixed(1)}
                </div>
              </div>
              <div className="text-sm font-comforta font-light text-gray-400">
                {movie.Meta[0]?.overview}
              </div>
              <div>
                <OTTProvider movieId={movie.tmdbId} />
              </div>
            </div>
            <div>
              {movie && movie.Videos.length > 0 ? (
                <div className="md:w-[55vw] md:h-[10vh]">
                  <div className="aspect-w-16 aspect-h-9 ">
                    <iframe
                      src={`https://youtube.com/embed/${movie.Videos[0].key}`}
                      frameBorder="0"
                      width={"55vw"}
                      height={"10vh"}
                      className={"rounded-md shadow-xl"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-3 md:hidden">
            <div className="text-xl md:text-2xl font-comforta font-bold text-teal-50">
              {"Top Cast"}
            </div>
            <SwipingCastSmall cast={movie?.Cast} />
          </div>
          <div className="hidden md:block md:mt-[5vh] lg:mt-[28vh] space-y-2">
            <div className="text-xl md:text-2xl font-comforta font-bold text-teal-50">
              {"Top Cast"}
            </div>
            <SwipingCast cast={movie?.Cast} />
          </div>
          <div className="mt-3 md:hidden">
            <div className="text-xl md:text-2xl font-comforta font-bold text-teal-50">
              {"Directors & Writers"}
            </div>
            <SwipingCrewSmall crew={movie?.Crew} />
          </div>
          <div className="hidden md:block space-y-2">
            <div className="text-xl md:text-2xl font-comforta font-bold text-teal-50">
              {"Directors & Writers"}
            </div>
            <SwipingCrew crew={movie?.Crew} />
          </div>
          <div className="mt-3 md:hidden">
            <div className="text-xl md:text-2xl font-comforta font-bold text-teal-50">
              {"You may also like"}
            </div>
            <YouMayLikeSmall selectedId={movie.movieId_mapped} />
          </div>
          <div className="hidden md:block space-y-2">
            <div className="text-xl md:text-2xl font-comforta font-bold text-teal-50">
              {"You may also like"}
            </div>
            <YouMayLike selectedId={movie.movieId_mapped} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Movie;
