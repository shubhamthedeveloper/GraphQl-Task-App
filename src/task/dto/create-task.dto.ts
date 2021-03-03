import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
// import { IsString } from 'class-validator';

@InputType()
export class CreateTaskDto {
  @Field()
  @IsNotEmpty()
  // @IsString()
  title: string;

  @Field()
  @IsNotEmpty()
  // @IsString()
  description: string;
}
