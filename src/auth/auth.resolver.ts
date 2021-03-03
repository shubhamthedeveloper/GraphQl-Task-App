import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserType } from './user.type';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { TokenType } from './token.type';

// @ObjectType('Token')
// class tokenType {
//   @Field({ nullable: true })
//   token: string;
// }

@Resolver(UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => UserType)
  createUser(@Args('authDto') authDto: AuthDto) {
    return this.authService.createUser(authDto);
  }

  // ERROR can only return ac schema type but want to return string
  @Mutation(() => TokenType)
  SignIn(@Args('authDto') authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }
}
