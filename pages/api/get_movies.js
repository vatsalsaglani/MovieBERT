import prisma from "../../lib/prisma";
import { toJson } from "../../lib/utils";


export default async function handler(req, res) {
  //   console.log("REQ: ", req.query);
  let id = parseInt(req.query.id);
  const data = await prisma.movies.findUnique({
    where: { id: id },
    include: {
      Meta: true,
      Posters: { take: 4 },
      BackDrops: { take: 3 },
      Cast: { take: 12 },
      Crew: { take: 12, where: {job: {in: ["Director", "Writer"]}} },
      Genre: true,
      Videos: { take: 3 },
    },
  });
  const j = toJson(data);
  //   console.log(j);
  return res.status(200).json(j);
}
