import { AuthenticationService } from 'src/services/Authentication';
import { Container } from 'typedi';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

const authenticationService = Container.get(AuthenticationService);

export const authenticationRouter = router({
  authenticate: publicProcedure.input(z.object({ name: z.string() })).mutation(async ({ input }) => {
    const hash = await authenticationService.authenticate(input.name);

    return { hash };
  }),
});
