import prisma from '@frontend/server/db/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const slug = req.query.slug as string;

  if (!slug) {
    return res.status(404).end();
  }

  const link = await prisma.link.findUnique({
    where: {
      slug,
    },
  });

  if (!link) {
    return res.status(404).end();
  }

  return res.redirect(link.url);
}
