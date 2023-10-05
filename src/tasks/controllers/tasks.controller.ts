import { Controller, Post, Body, Get, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { TasksService } from '../tasks.service';
import { CreateTaskDto } from '../dtos/create_task';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) { }

    @HttpCode(201)
    @Post()
    async createTask(@Body() createTask: CreateTaskDto): Promise<CreateTaskDto> {
        return await this.tasksService.createTask(createTask)

    }


    @HttpCode(200)
    @Get()
    async getAllTasks(): Promise<CreateTaskDto[]> {
        return await this.tasksService.findAll()
    }

    @HttpCode(200)
    @Get(':id')
    async getOneTask(@Param('id') id: string): Promise<CreateTaskDto> {
        return this.tasksService.findOne(id)

    }


    @Put(':id')
    async update(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
        return this.tasksService.update(id, createTaskDto);
    }


    @HttpCode(204)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.tasksService.findOne(id);
        return this.tasksService.delete(id);
    }

}
