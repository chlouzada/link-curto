// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { search } = req.query as { search: string };

  const link = await prisma.shortURL.findFirst({
    where: {
      shortUrl: search,
    },
  });

  if (!link) return res.status(404).json({ message: "link not found" });

  res.redirect(link.url);
}
