import { inferAsyncReturnType } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

import { IContext } from './types';

export async function createContext({ req, res }: CreateFastifyContextOptions): Promise<IContext> {
  return { req, res };
}

export type Context = inferAsyncReturnType<typeof createContext>;
