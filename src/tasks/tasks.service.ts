import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { TaskStatus, Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTaskById(id: string): Task{
        return this.tasks.find(task => task.id === id);
    }

    deleteTaskById(id: string){
        this.tasks = this.tasks.filter(task => task.id != id);
        return;
    }

    createTask(createTaskDto: CreateTaskDto): Task{

        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuid.v4(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

}
