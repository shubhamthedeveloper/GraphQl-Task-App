import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserType } from './Type/user.type';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './service/auth.service';
import { TokenType } from './Type/token.type';
import { GetUser } from './get-user.decorator';
import { User } from './Entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './auth-gaurd';

@Resolver(UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  // Create New user
  @Mutation(() => UserType)
  createUser(@Args('authDto') authDto: AuthDto) {
    return this.authService.createUser(authDto);
  }

  // User Sign In
  @Mutation(() => TokenType)
  SignIn(@Args('authDto') authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  // update user status
  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserType)
  updateTask(
    @Args('id') id: number,
    @Args('status') status: boolean,
    @GetUser() user: User,
  ) {
    return this.authService.updateStatus(id, status, user);
  }
}
