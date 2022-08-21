import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { SearchList, SearchInput } from "../components/SearchComponents";
import { MovieCard } from "../components/MovieCard";
import { Toaster } from "react-hot-toast";
import { CustomToast } from "../components/ToastAlert";
import { urls } from "../urls";

export default function Home() {
  const [matchedMovies, setMatchedMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [recommending, setRecommending] = useState(false);
  const [recommended, setRecommended] = useState([]);
  console.log("URLS: ", urls);
  console.log(process.env.REC_URL, process.env.IMG_URL)
  useEffect(() => {
    const warmup = async () => {
      const resp = await fetch("/api/recommendations", {
        method: "POST",
        body: JSON.stringify({
          selected: [222, 232],
          hist: 2,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
    };
    warmup();
  }, []);

  const onClickRecommend = async () => {
    if (selectedMovies.length > 0) {
      setRecommending(true);
      let selectedIds = selectedMovies.map((movie) => movie.movieId_mapped);
      const resp = await fetch("/api/recommendations", {
        method: "POST",
        body: JSON.stringify({
          selected: selectedIds,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      if (data.ok) {
        // console.log("RECOMMENDATIONS: ", data);
        setRecommended([...data.movies]);
        setSelectedMovies([...selectedMovies, ...data.movies]);
      }
      setRecommending(false);
    } else {
      CustomToast({
        title: "Please search and select movies you have watched",
        info: "To get better results please provide at least three movies you have watched and like",
      });
    }
  };

  const searchMovie = async (event) => {
    const txt = event.target.value;
    // console.log("SEARCH TEXT: ", txt);
    if (txt.length == 0) {
      setMatchedMovies([]);
    }
    if (txt.length > 3) {
      const data = await fetch(`/api/search_movies?s=${txt}`);
      const j = await data.json();
      // console.log(j);
      setMatchedMovies([...j]);
    }
  };

  const onClickCross = (e, cancelled_movie) => {
    e.preventDefault();
    let new_selected = selectedMovies.filter(
      (movie) => movie.movieId !== cancelled_movie.movieId
    );
    setSelectedMovies([...new_selected]);
    e.preventDefault();
  };

  return (
    <div
      className={`px-1 py-2 md:px-4 mx-auto min-w-full min-h-screen bg-gradient-to-l from-black via-slate-700 to-black`}
    >
      <Head>
        <title>MovieBERT</title>
      </Head>
      <div
        className={`flex min-h-screen flex-col justify-center items-center space-y-4`}
      >
        <div
          className={`text-3xl font-extrabold text-teal-300 tracking-wider font-comforta `}
        >
          MovieBERT
        </div>
        <div className={`flex flex-col items-center space-y-2 md:space-x-1`}>
          <SearchInput movie={matchedMovies} setSearchMovie={searchMovie} />
          {recommending ? (
            <button className="btn btn-square loading"></button>
          ) : (
            <button
              className="relative inline-flex px-8 py-3 items-center overflow-hidden text-teal-600 border border-current rounded group active:text-teal-500 focus:outline-none focus:ring"
              type="button"
              onClick={() => onClickRecommend()}
            >
              <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-slate-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              <span className="text-sm font-comforta text-slate-100 ite font-medium transition-all group-hover:mr-4">
                Recommend
              </span>
            </button>
          )}
        </div>
        {matchedMovies.length > 0 ? (
          <SearchList
            results={matchedMovies}
            selections={selectedMovies}
            setSelections={setSelectedMovies}
          />
        ) : null}
        {matchedMovies.length === 0 && selectedMovies.length > 0 ? (
          <div className="w-[60vw] justify-start items-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 md:gap-2">
            {selectedMovies.map((movie, index) => {
              return (
                <div key={index} className="">
                  <MovieCard movie={movie} onRemove={onClickCross} />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <Toaster />
    </div>
  );
}
