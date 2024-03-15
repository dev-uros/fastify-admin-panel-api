import { FastifyPluginAsync } from "fastify";
import { FastifyPluginOptions } from "fastify/types/plugin.js";
import AutoLoad from "@fastify/autoload";
import { join } from "desm";

const inpspirationDomain: FastifyPluginAsync = async (fastify, opts: FastifyPluginOptions): Promise<void> => {
  await fastify.register(AutoLoad, {
    dir: join(import.meta.url, 'repositories'),
    ignorePattern: /Interface\.(js|ts)$/,
    forceESM: true,
  });

  await fastify.register(AutoLoad, {
    dir: join(import.meta.url, 'services'),
    ignorePattern: /Interface\.(js|ts)$/,
    forceESM: true,
  });

  await fastify.register(AutoLoad, {
    dir: join(import.meta.url, 'routes'),
    options: {
      prefix: opts.prefix,
    },
    forceESM: true,
    encapsulate: true
  });
};

export default inpspirationDomain;
