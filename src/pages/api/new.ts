// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, shortUrl } = req.body;

  try {
    const link = await prisma.shortURL.create({
      data: {
        url,
        shortUrl,
      },
    });
    res.status(200).json(link);
  } catch (error) {
    // check if prisma duplicate key error
    if ((error as any).code === "P2002")
      return res.status(403).send(undefined);

    res.status(500).send(undefined);
  }
}
