import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TaskType } from './Type/task.type';
import { TaskService } from './Service/task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './Entities/task-status.enum';
import { User } from '../auth/Entities/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { GqlAuthGuard } from '../auth/auth-gaurd';

@Resolver('TaskType')
@UseGuards(GqlAuthGuard)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  // Create New Task
  @Mutation(() => TaskType)
  createTask(
    @Args('createTaskDto') createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ) {
    return this.taskService.createTask(createTaskDto, user);
  }

  // Retrieve all user Tasks
  @Query(() => [TaskType])
  getTasks(@GetUser() user: User) {
    console.log(user);
    return this.taskService.getTasks(user);
  }

  // Update Task Status
  @Mutation(() => TaskType)
  updateTask(
    @Args('id') id: number,
    @Args('status') status: TaskStatus,
    @GetUser() user: User,
  ) {
    return this.taskService.updateTaskStatus(id, status, user);
  }

  // Delete task by ID
  @Mutation(() => TaskType)
  deleteTask(@Args('id') id: number, @GetUser() user: User) {
    return this.taskService.deleteTask(id, user);
  }
}
