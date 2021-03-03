import { ObjectType, Field, Int } from '@nestjs/graphql';
// import { type } from 'os';

@ObjectType('Task')
export class TaskType {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;
}
