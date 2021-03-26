import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../Entities/task.entity';
import { TaskStatus } from '../Entities/task-status.enum';
import { User } from '../../auth/Entities/user.entity';
import { UserRole } from '../../auth/Entities/user-role.enum';
import { ErrorCode } from '../../common/exceptions';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  // Create Task
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  // Retrieve tasks
  getTasks(user: User): Promise<Task[]> {
    if (user.role == UserRole.ADMIN) {
      return this.taskRepository.find();
    } else {
      return this.taskRepository.getTask(user);
    }
  }

  // Retrive the task by specific ID
  async getTaskById(id: number, user: User): Promise<Task> {
    return this.taskRepository.findOne({ where: { id, userId: user.id } });
  }

  // update task
  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    if (!task) {
      throw new NotFoundException(
        'No Task for this Id',
        ErrorCode.TASK_NOT_PRESENT,
      );
    }
    task.status = status;
    task.save();
    return task;
  }

  // delete task by id
  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskRepository.delete({ id, userId: user.id });
    if (result.affected === 0)
      throw new NotFoundException(ErrorCode.TASK_NOT_PRESENT);
  }
}
