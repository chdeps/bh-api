// @flow

import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './types.graphql';
import resolvers from './resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
