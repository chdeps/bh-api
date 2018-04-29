// @flow

export default async function authMiddleware(ctx, next){
  ctx.state.user = null;
  await next();
}
