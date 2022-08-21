import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { urls } from "../urls";
import { tz2code } from "../lib/timezonetocountry";

export const OTTProvider = ({ movieId }) => {
  const [providers, setProviders] = useState([]);
  let tz = tz2code(Intl.DateTimeFormat().resolvedOptions().timeZone);
  if (tz) {
    tz = tz.toUpperCase();
  }
  console.log(tz);
  useEffect(() => {
    const get_providers = async () => {
      // https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?api_key=<<api_key>>
      const resp = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${urls.tmdb_api}`
      );
      const data = await resp.json();
      if (data.hasOwnProperty("success") && !data.success) {
        tz = null;
      } else {
        setProviders(data.results[tz]);
      }
    };
    get_providers();
  }, []);
  console.log("PROVIDERS: ", providers);
  if (tz && providers) {
    console.log("PROVIDERS");
    return (
      <div className="space-y-1 md:space-y-2 flex flex-col">
        {Object.keys(providers).map((k, idx) => (
          <ProviderList
            key={idx}
            provision_type={k}
            provider={providers[k]}
            link={providers.link}
          />
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export const ProviderList = ({ provision_type, provider, link }) => {
  console.log("PT: ", provision_type);
  console.log("PV: ", provider);
  if (provision_type === "link") {
    return <></>;
  }
  return (
    <div className="space-y-1 md:space-y-2">
      <div className="text-lg text-teal-50 font-comforta capitalize">
        {provision_type === "flatrate" ? "Stream" : provision_type}
      </div>
      <div className="flex flex-row justify-start space-x-2 items-center">
        {provider.length > 0
          ? provider.map((prov, index) => {
              return (
                <ProviderBlip key={index} logo={prov.logo_path} link={link} />
              );
            })
          : null}
      </div>
      <div className="divider"></div>
    </div>
  );
};

export const ProviderBlip = ({ logo, link }) => (
  <Link href={link} target="_blank">
    <a target={"_blank"}>
      <Image
        src={`https://image.tmdb.org/t/p/original${logo}`}
        height={35}
        width={35}
        layout={"fixed"}
        objectFit={"contain"}
        className="rounded-md shadow-md"
        priority
      />
    </a>
  </Link>
);
