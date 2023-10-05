import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

        try {
            const task = this.taskRepository.create(createTaskDto);
            await this.taskRepository.save(task);
            return task;

        } catch (error) {
            throw new InternalServerErrorException("Erro ao cadastrar o usuario")
        }
    }

    async findAll(): Promise<CreateTaskDto[]> {

        try {
            return await this.taskRepository.find();

        } catch (error) {
            throw new NotFoundException('Nenhum usuário encontrado');
        }
    }

    async findOne(id: string): Promise<CreateTaskDto> {

        try {
            const user = await this.taskRepository.findOne({ where: { id } });

            if (!user) {
                throw new NotFoundException("Usuario não encontrado")
            }

            return user;
        } catch (error) {
            throw new BadRequestException('Usuário não encontrado ou erro no banco de dados');
        }
    }

    async update(id: string, TaskDto: CreateTaskDto): Promise<CreateTaskDto> {

        try {
            await this.taskRepository.update(id, TaskDto);
            return await this.taskRepository.findOne({ where: { id } });

        } catch (error) {
            throw new BadRequestException('Erro ao atualizar o usuario');
        }
    }

    async delete(id: string): Promise<void> {

        try {
            await this.taskRepository.delete(id);
        } catch (error) {
            throw new InternalServerErrorException("Erro ao deletar o usuario")
        }
    }
}
