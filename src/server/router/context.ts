import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import prisma from '../db/client';

type CreateContextOptions = Record<string, never>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createContextInner = async (_opts: CreateContextOptions) => {
  return {
    prisma,
  };
};

export const createContext = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _opts: trpcNext.CreateNextContextOptions,
) => {
  return createContextInner({});
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
