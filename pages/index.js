import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { SearchList, SearchInput } from "../components/SearchComponents";
import { MovieCard } from "../components/MovieCard";
import { Toaster } from "react-hot-toast";
import { CustomToast } from "../components/ToastAlert";
import { urls } from "../urls";
import Link from "next/link";

export default function Home() {
  const [matchedMovies, setMatchedMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [recommending, setRecommending] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  // console.log("URLS: ", urls);
  // console.log(process.env.REC_URL, process.env.IMG_URL)
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
    setSearchVal(txt);
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

  const clearSearch = () => {
    setSearchVal("");
    setMatchedMovies([]);
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
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta
          name="description"
          content={
            "Hi, I am MovieBERT. I will recommend you good movies to watch based on you past viewing experience. I am still being trained on a lot of data so some recommendation might not be exactly accurate as well"
          }
        />
        <meta
          property="og:title"
          content={
            "MovieBERT Demo: A BERT based collaborative filtering model trained on the MovieLens dataset"
          }
        />
        <meta
          property="og:description"
          content={
            "Hi, I am MovieBERT. I will recommend you good movies to watch based on you past viewing experience. I am still being trained on a lot of data so some recommendation might not be exactly accurate as well"
          }
        />
        <meta
          property="og:image"
          content="https://vs-bucket-allthings.s3.us-east-2.amazonaws.com/moviebert.png"
        />
        <meta property="og:url" content={"https://www.moviebert.ml"} />
        <meta property="og:type" content={"article"} />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@saglanivatsal" />
        <meta name="twitter:creator" content="@saglanivatsal" />
        <meta
          name="twitter:title"
          content={
            "MovieBERT Demo: A BERT based collaborative filtering model trained on the MovieLens dataset"
          }
        />
        <meta
          name="twitter:image"
          content="https://vs-bucket-allthings.s3.us-east-2.amazonaws.com/moviebert.png"
        />
        <meta
          name="twitter:description"
          content={
            "Hi, I am MovieBERT. I will recommend you good movies to watch based on you past viewing experience. I am still being trained on a lot of data so some recommendation might not be exactly accurate as well"
          }
        />
      </Head>
      <div
        className={`flex min-h-screen flex-col justify-center items-center space-y-4`}
      >
        <div className="items-center justify-center">
          <div
            className={`text-3xl font-extrabold text-teal-300 tracking-wider font-comforta `}
          >
            MovieBERT
          </div>
        </div>
        <div className={`flex flex-col items-center space-y-2 md:space-x-1`}>
          <SearchInput
            searchVal={searchVal}
            setSearchVal={setSearchVal}
            movie={matchedMovies}
            setSearchMovie={searchMovie}
            clearSearch={clearSearch}
          />
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
          <div className="w-[60vw] mb-4 justify-start items-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 md:gap-2">
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
      <footer
        className={`px-2 md:px-4 flex flex-row justify-between items-center  ${
          (matchedMovies.length === 0) & (selectedMovies.length !== 0)
            ? "mt-[2vh]"
            : "mt-[-5vh]"
        }  mb-[5vh]`}
      >
        <div
          className={`text-sm  font-light text-gray-500 font-comforta justify-start items-start`}
        >
          Developed by:{" "}
          <Link href={"https://twitter.com/saglanivatsal"} target={"blank"}>
            <a
              className="hover:underline hover:decoration-teal-200 hover:transition-all hover:text-teal-400"
              target={"_blank"}
            >
              @saglanivatsal
            </a>
          </Link>
        </div>
        <div>
          <div
            className={`text-sm  font-light text-gray-500 font-comforta justify-start items-start`}
          >
            <Link href={"https://www.vatsalsaglani.dev"} target={"blank"}>
              <a
                className="hover:underline hover:decoration-teal-200 hover:transition-all hover:text-teal-200"
                target={"_blank"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
