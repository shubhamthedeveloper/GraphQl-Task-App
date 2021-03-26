import { Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';
import { TaskService } from './Service/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './Service/task.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), AuthModule],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
