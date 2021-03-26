import { ObjectType, Field, Int } from '@nestjs/graphql';
// import { UserStatus } from '../user-status.enum';

@ObjectType('User')
export class UserType {
  @Field((type) => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  is_active: boolean;
}
