import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper";
import Image from "next/image";
import { urls } from "../urls";
// SwiperCore.use([Pagination, Navigation, Autoplay]);

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const CrewCard = ({ real_name, profile, job }) => {
  return (
    <div className="relative block bg-black group rounded-lg shadow-lg" href="">
      <Image
        className="absolute inset-0 object-cover w-full h-full rounded-lg transition-opacity opacity-75  group-hover:opacity-50"
        src={`${urls.img_url}${profile}`}
        // src={`https://image.tmdb.org/t/p/original${profile}`}
        alt=""
        layout="fill"
        priority
      />
      {/* <img
        className="absolute inset-0 object-cover w-full h-full rounded-lg transition-opacity opacity-75  group-hover:opacity-50"
        src={`https://image.tmdb.org/t/p/original${profile}`}
        alt=""
      /> */}
      <div className="relative p-8">
        <p className="text-2xl font-bold font-comforta text-white">{job}</p>

        <div className="mt-64">
          <div className="transition-all transform translate-y-8 opacity-100 md:opacity-0  md:group-hover:opacity-100 md:group-hover:translate-y-0">
            <p className="text-2xl font-bold text-white font-comforta">
              {real_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SwipingCrew = ({ crew }) => {
  return (
    <div className="h-[20%]">
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
        {crew.map((c, index) => (
          <SwiperSlide key={index} className={`p-4 swiper-button-disabled`}>
            <CrewCard {...c} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export const SwipingCrewSmall = ({ crew }) => {
  return (
    <div className="h-[20%]">
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
        className={"swiper-button-disabled"}
      >
        {crew.map((c, index) => (
          <SwiperSlide key={index} className={`p-4 swiper-button-disabled`}>
            <CrewCard {...c} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
