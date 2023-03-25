import { appRouter } from '@frontend/server/router';
import { createContext } from '@frontend/server/router/context';
import { createNextApiHandler } from '@trpc/server/adapters/next';

export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError: ({ path, error }) =>
    // eslint-disable-next-line no-console
    console.error(`TRPC failure on ${path}: ${error}`),
});
