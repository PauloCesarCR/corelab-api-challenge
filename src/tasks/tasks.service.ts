import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dtos/create_task';
import { ApiBadRequestResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) { }

    async createTask(createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
        const task = this.taskRepository.create(createTaskDto);
        await this.taskRepository.save(task);
        return task;
    }

    async findAll(): Promise<CreateTaskDto[]> {
        return this.taskRepository.find();
    }

    async findOne(id: string): Promise<CreateTaskDto> {
        return await this.taskRepository.findOne({ where: { id } });
    }

    async update(id: string, TaskDto: CreateTaskDto): Promise<CreateTaskDto> {
        await this.taskRepository.update(id, TaskDto);
        return await this.taskRepository.findOne({ where: { id } });
    }

    async delete(id: string): Promise<void> {
        await this.taskRepository.delete(id);
    }
}
