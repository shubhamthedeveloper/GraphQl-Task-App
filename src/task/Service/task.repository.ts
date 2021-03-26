import { Task } from '../Entities/task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '../Entities/task-status.enum';
import { User } from '../../auth/Entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { ErrorCode } from '../../common/exceptions';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTask(user: User): Promise<Task[]> {
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      throw new NotFoundException(ErrorCode.TASK_NOT_PRESENT);
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    task.user = user;

    await task.save();
    delete task.user;
    return task;
  }
}
