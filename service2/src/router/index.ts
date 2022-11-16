import { authenticationRouter } from './routers/authentication';
import { router } from './trpc';

export const appRouter = router({
  authentication: authenticationRouter,
});

export type AppRouter = typeof appRouter;
