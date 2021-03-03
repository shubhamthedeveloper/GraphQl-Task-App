import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TaskType } from './task.type';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
// import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from '../auth/auth-gaurd';

@Resolver('TaskType')
@UseGuards(GqlAuthGuard)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  // create task
  @Mutation(() => TaskType)
  createTask(
    @Args('createTaskDto') createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ) {
    return this.taskService.createTask(createTaskDto, user);
  }

  // 2, Get task by ID
  @Query(() => TaskType)
  getTask(@Args('id') id: number, @GetUser() user: User) {
    return this.taskService.getTaskById(id, user);
  }

  // 4. Update Task Description
  // not getting the updates message how to print that
  @Mutation(() => TaskType)
  updateTask(
    @Args('id') id: number,
    @Args('status') status: TaskStatus,
    @GetUser() user: User,
  ) {
    return this.taskService.updateTaskStatus(id, status, user);
  }

  //   5. Delete task by ID
  // why will it return anything - should be void
  @Mutation(() => TaskType)
  deleteTask(@Args('id') id: number, @GetUser() user: User) {
    return this.taskService.deleteTask(id, user);
  }
}
// error handling
