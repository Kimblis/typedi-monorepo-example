import * as dotenv from 'dotenv';
import 'reflect-metadata';

import { createServer } from './server';

if (process.env.DC == null) {
  dotenv.config();
}

const server = createServer(process.env);

void (async function () {
  await server.start();
})();
