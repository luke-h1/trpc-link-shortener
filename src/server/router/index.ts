import superjson from 'superjson';
import { createRouter } from './context';
import { linkRouter } from './link';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('link.', linkRouter);

export type AppRouter = typeof appRouter;
