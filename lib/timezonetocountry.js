import data from "./data.json";

export const tz2code = (tz) => {
  tz = tz.replace("Calcutta", "Kolkata");
  let filtered = data.filter((t) => t.timeZone == tz);
  if (filtered.length > 0) {
    return filtered[0].countryCode;
  }
  return null;
};
