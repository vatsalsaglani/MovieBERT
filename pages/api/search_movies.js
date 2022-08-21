import prisma from "../../lib/prisma";
import { toJson } from "../../lib/utils";
import { compareDesc, compareAsc } from "date-fns";

export default async function handler(req, res) {
  let txt = req.query.s;
  const data = await prisma.movies.findMany({
    where: {
      Meta: {
        every: {
          title: {
            contains: txt,
            mode: "insensitive",
          },
        },
      },
    },
    // orderBy: {
    //   Meta: {
    //     popularity: "desc",
    //   },
    // },
    include: {
      Meta: true,
      Posters: { take: 1 },
    },
  });
  const j = toJson(data);
  // console.log("LEN: ", j.length);
  const d = j.sort((a, b) => {
    if (a.Meta[0].release_date > b.Meta[0].release_date) return -1;
    if (a.Meta[0].release_date < b.Meta[0].release_date) return 1;
    return 0;
  });
  //   console.log("D: ", d)
  return res.status(200).json(d);
}
