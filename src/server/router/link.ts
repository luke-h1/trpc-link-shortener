import { nanoid } from 'nanoid';
import { z } from 'zod';
import prisma from '../db/client';
import { createRouter } from './context';

const generateSlug = () =>
  `${nanoid()}-${Math.random().toString(20).substring(2, 8)}`;

export const linkRouter = createRouter().mutation('create', {
  input: z.object({
    url: z.string().url(),
  }),
  async resolve({ input }) {
    // TODO - validation
    const link = await prisma.link.upsert({
      where: {
        url: input.url,
      },
      update: {},
      create: { url: input.url, slug: generateSlug() },
    });
    return link;
  },
});
