import { FastifyReply, FastifyRequest } from 'fastify';

export interface IContext extends Record<string, unknown> {
  req: FastifyRequest;
  res: FastifyReply;
}
