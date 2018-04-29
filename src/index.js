// @flow

import 'babel-polyfill';
import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaBodyParser from 'koa-bodyparser';
import koaPlayground from 'graphql-playground-middleware-koa';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import { ApolloEngine } from 'apollo-engine';
import getDataloaders from './dataloaders';
import { authMiddleware } from './middlewares';
import schema from './schema';

const PORT = 3000;

const graphqlConfiguration = graphqlKoa(ctx => ({
  context: {
    dataLoaders: getDataloaders(),
    user: ctx.state.user,
  },
  schema,
  tracing: true,
  cacheControl: true,
}));

const router = new KoaRouter();
router.post('/graphql', graphqlConfiguration);
router.get('/graphql', graphqlConfiguration);
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

router.all(
  '/playground',
  koaPlayground({
    endpoint: '/graphql',
    workspaceName: 'Staging',
    useGraphQLConfig: false,
  })
);

const graphql = new Koa();
graphql.use(koaBodyParser());
graphql.use(authMiddleware);
graphql.use(router.routes());
graphql.use(router.allowedMethods());


const engine = new ApolloEngine({
  apiKey: 'service:chdeps-1009:qlXMs7LdxWcIvFYoTna9rg',
});

engine.listen({ port: PORT, koaApp: graphql });
