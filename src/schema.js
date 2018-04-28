// @flow

import { makeExecutableSchema } from 'graphql-tools';

import types from './types.graphql';
import resolvers from './resolvers';

const schema = makeExecutableSchema({
  types,
  resolvers,
});

export default schema;
