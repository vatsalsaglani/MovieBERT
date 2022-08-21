import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { urls } from "../urls";

export const SearchInput = ({ movie, setSearchMovie }) => {
  const filterRef = useRef();
  useEffect(() => {
    let delayTimeOutFunction;

    if (!filterRef.current) {
      filterRef.current = true;
    } else {
      delayTimeOutFunction = setTimeout(() => {
        // console.log("SEARCH");
      }, 3000);
    }
    return () => clearTimeout(delayTimeOutFunction);
  }, [movie]);

  return (
    <div className="sticky min-w-full">
      <div className="relative min-w-full">
        <label className="sr-only" htmlFor="search">
          Search
        </label>

        <input
          className="min-w-full md:w-[40vw] font-comforta py-3 pl-3 pr-12 text-sm border-2 border-gray-200 rounded-md"
          id="search"
          type="search"
          placeholder="Search Movies"
          onChange={(e) => setSearchMovie(e)}
        />

        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none top-1/2 right-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
      </div>
    </div>
  );
};

export const SearchList = ({ results, selections, setSelections }) => {
  // console.log("URL: ", process.env.IMAGE_URL);
  return (
    <div
      className={`flex flex-col space-y-2 max-h-[40vh] scrollbar scrollbar-thumb-sky-500 scrollbar-track-gray-100 overflow-y-scroll justify-start items-start min-w-full md:min-w-[40vw] px-2 py-2`}
    >
      {results.map((result, index) => {
        return (
          <Result
            key={index}
            result={result}
            selections={selections}
            setSelections={setSelections}
          />
        );
      })}
    </div>
  );
};

export const Result = ({ result, selections, setSelections }) => {
  let [isSelected, setIsSelected] = useState(false);
  const onSelect = () => {
    if (isSelected) {
      setSelections(
        ...selections.filter((item) => item.movieId !== result.movieId)
      );
    } else {
      setSelections([...selections, result]);
    }
    setIsSelected(!isSelected);
  };
  return (
    <button
      onClick={() => {
        onSelect();
      }}
      className={`flex w-full space-x-1 items-center justify-start px-1 pt-2 ${
        isSelected
          ? "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 rounded-sm"
          : ""
      }`}
    >
      <div className={``}>
        {result?.Posters[0]?.path ? (
          <Image
            src={`${urls.img_url}${result?.Posters[0]?.path}`}
            // src={`https://image.tmdb.org/t/p/original${result?.Posters[0]?.path}`}
            width="50"
            height="60"
            className=" rounded-md shadow-lg "
            alt={`Poster: ${result.Meta[0].title}`}
          />
        ) : null}
      </div>
      <div className="text-lg font-comforta font-semibold text-teal-200">
        {result.Meta[0].title}
      </div>
    </button>
  );
};
