import prisma from "../../lib/prisma";
import { toJson } from "../../lib/utils";
import { urls } from "../../urls";
export default async function handler(req, res) {
  const body = req.body;
  // console.log("BODY: ", body);
  const selectedIds = body.selected;
  const history = body?.hist || 15;
  // const url =
  //   "https://uze6myl1e7.execute-api.ap-south-1.amazonaws.com/Prod/api/recommend";
  const resp = await fetch(urls.rec_url, {
    method: "POST",
    body: JSON.stringify({ sequence: selectedIds, history: history }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  // console.log("RESP: ", resp);
  const data = await resp.json();
  // console.log("DATA: ", data);
  if (data.ok) {
    let movies = await prisma.movies.findMany({
      where: {
        movieId_mapped: {
          in: data.recommendations,
        },
      },
      include: {
        Posters: { take: 1 },
        Meta: true,
      },
    });
    movies = toJson(movies);
    movies = movies.map((movie) => ({ ...movie, isRecommended: true }));
    return res.status(200).json({ movies: movies, ok: true });
  }
  return res.status(200).json({ ok: false });
}
