import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('Task')
export class TaskType {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;
}
