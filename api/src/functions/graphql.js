import {
  createGraphQLHandler,
  makeMergedSchema,
  makeServices,
} from '@redwoodjs/api';
import importAll from '@redwoodjs/api/importAll.macro';

import { getUserById } from 'src/services/users/users';
import { decodeToken } from 'src/lib/auth';
import { db } from 'src/lib/db';

const schemas = importAll('api', 'graphql');
const services = importAll('api', 'services');

// Until I can customize getUserFromContext, do it myself
// This var is shared by `@redwoodjs/web`
const REDWOOD_AUTH_TYPE_HEADER = 'x-redwood-auth-type';
const getUserFromContext = async ({ event }) => {
  const type = event?.headers[REDWOOD_AUTH_TYPE_HEADER];
  switch (type) {
    case 'google': {
      const bearerToken = event.headers?.authorization.split(' ')[1];
      const { userId } = decodeToken(bearerToken);
      const user = getUserById({ id: userId });
      return user;
    }
    default:
      return null;
  }
};

const customContextHandler = async ({ context, event }) => {
  const currentUser = await getUserFromContext({ context, event });

  return { currentUser };
};

export const handler = createGraphQLHandler(
  {
    schema: makeMergedSchema({
      schemas,
      services: makeServices({ services }),
    }),
    // Specify custom context handler
    context: customContextHandler,
  },
  db
);
