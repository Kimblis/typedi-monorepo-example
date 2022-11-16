import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify, { FastifyInstance } from 'fastify';
import { checkEnvVariables } from '#service1/services/environment';

import { appRouter } from './router';
import { createContext } from './router/context';

export interface ServerControl {
  server: FastifyInstance;
  start: () => Promise<void>;
  stop: () => Promise<undefined>;
}

export function createServer(env: NodeJS.ProcessEnv): ServerControl {
  checkEnvVariables();
  const { NODE_ENV: nodeEnv, API_PORT: port, API_PREFIX: prefix } = env;
  const isDevelopmentEnv = nodeEnv === 'development';
  const server = fastify({ logger: isDevelopmentEnv });

  void server.register(fastifyTRPCPlugin, {
    prefix,
    trpcOptions: { router: appRouter, createContext },
  });

  server.get('/', () => {
    return `service2`;
  });

  const stop = async (): Promise<undefined> => server.close();
  const start = async (): Promise<void> => {
    try {
      await server.listen({ port: parseInt(port as string, 10), host: '0.0.0.0' });
      console.log(`Fastify running on http://localhost:${port}`);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };

  return { server, start, stop };
}
