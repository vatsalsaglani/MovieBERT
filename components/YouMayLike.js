import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import Image from "next/image";
import { MovieCard } from "./MovieCard";
import { urls } from "../urls";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const YouMayLike = ({ selectedId }) => {
  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const get_movies = async () => {
      const resp = await fetch("/api/recommendations", {
        method: "POST",
        body: JSON.stringify({
          selected: [selectedId],
          hist: 4,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      if (data.ok) {
        setRecommended([...data.movies]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    get_movies();
  }, []);
//   console.log("REC: ", recommended)
  if (loading) {
    return <></>;
  } else if (!loading && !recommended.length > 0) {
    return <>ERROR</>;
  } else {
    return (
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        slidesPerGroup={4}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        // autoplay={{
        //   delay: 10000,
        //   disableOnInteraction: false,
        // }}
        modules={[Pagination, Autoplay]}
        className={"swiper-button-disabled"}
      >
        {recommended.map((rec, index) => (
          <SwiperSlide key={index}>
            <MovieCard movie={rec} onRemove={null} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
};
export const YouMayLikeSmall = ({ selectedId }) => {
  const [loading, setLoading] = useState(true);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const get_movies = async () => {
      const resp = await fetch("/api/recommendations", {
        method: "POST",
        body: JSON.stringify({
          selected: [selectedId],
          hist: 4,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      if (data.ok) {
        setRecommended([...data.movies]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    get_movies();
  }, []);
//   console.log("REC: ", recommended)
  if (loading) {
    return <></>;
  } else if (!loading && !recommended.length > 0) {
    return <>ERROR</>;
  } else {
    return (
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
      >
        {recommended.map((rec, index) => (
          <SwiperSlide key={index}>
            <MovieCard movie={rec} onRemove={null} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
};
