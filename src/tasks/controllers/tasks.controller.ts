import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { TasksService } from '../tasks.service';
import { CreateTaskDto } from '../dtos/create_task';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) { }

    @Post()
    async createTask(@Body() createTask: CreateTaskDto): Promise<CreateTaskDto> {
        return await this.tasksService.createTask(createTask)

    }

    @Get()
    async getAllTasks(): Promise<CreateTaskDto[]> {
        return await this.tasksService.findAll()
    }

    @Get(':id')
    async getOneTask(@Param('id') id: string): Promise<CreateTaskDto> {
        return this.tasksService.findOne(id)

    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
        return this.tasksService.update(id, createTaskDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        const task = await this.tasksService.findOne(id);
        if (!task) {
            throw new Error('User not found');
        }
        return this.tasksService.delete(id);
    }

}
