// Gql auth guard for GraphQL

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ErrorCode } from '../common/exceptions';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    // console.log(ctx.getContext().user);
    if (ctx.getContext().user.is_active == true) {
      return ctx.getContext().req;
    } else {
      throw new UnauthorizedException(
        'you are not authorized',
        ErrorCode.ACCESS_DENIED,
      );
    }
  }
}
