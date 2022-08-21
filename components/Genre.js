import { useState } from "react";

export const Genre = ({ genres }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  const changeIsMore = () => {
    setIsShowMore(!isShowMore);
  };

  return <GenreList genres={genres} />;
};

export const GenreList = ({ genres }) => {
  return (
    <div className="grid grid-cols-4 gap-1">
      {genres.map((genre, index) => (
        <GenreTag key={index} name={genre.name} />
      ))}
    </div>
  );
};

export const GenreTag = ({ name }) => (
  <strong className="border text-gray-400 border-current uppercase items-center text-center px-0.5 py-0.5 rounded-full text-[8px]">
    {name}
  </strong>
);
