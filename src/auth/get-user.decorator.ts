// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { User } from './user.entity';
// import { GqlExecutionContext } from '@nestjs/graphql';

// export const GetUser = createParamDecorator(
//   (data: any, ctx: ExecutionContext): User => {
//     const request = ctx.switchToHttp().getRequest();
//     return request.user;
//   },
// );

// export const GetUser = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext): User => {
//     const request = GqlExecutionContext.create(ctx).getContext();
//     return request.user;
//   },
// );

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
