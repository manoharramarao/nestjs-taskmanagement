import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {

    constructor (
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    async getTaskById(
        id: number, 
        user: User
    ): Promise<Task>{
        const found = await this.taskRepository.findOne({where: {id, userId: user.id}});
        if(!found){
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: User): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: number): Promise<DeleteResult>{
        /* const found = await this.taskRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`Task with id ${id} is not found`);
        }
        await found.remove(); */
        const result = await this.taskRepository.delete(id);
        if(result.affected === 0){
            throw new NotFoundException(`The task with id ${id} is not found`);
        }

        return result;
    }
    
    /* async udpateTaskStatus(id: number, status: TaskStatus): Promise<Task>{

        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    } */

    async getTasks(
        filterDto: GetTasksFilterDto,
        user: User): Promise<Task[]>{
        return await this.taskRepository.getTasks(filterDto, user);
    }

    /* private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const {status, search} = filterDto;
        let tasks = this.getAllTasks();
        if(status){
            tasks = tasks.filter(task => task.status === status);
        }
        if(search){
            tasks = tasks.filter(task => 
                task.title.includes(search) || 
                task.description.includes(search),   
            );
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id);
        if(!found){
            throw new NotFoundException(`Task with "${id}" not found`);
        } 
        return found;
    }

    deleteTaskById(id: string) {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id != found.id);
        return;
    }

    createTask(createTaskDto: CreateTaskDto): Task {

        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid.v4(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    } */

}
