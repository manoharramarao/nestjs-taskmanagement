import { TasksService } from "./tasks.service";

import { Test } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from "./task-status.enum";

const mockUser = {username: 'Test user'};

const mockTaskRepo = () => ({
    getTasks: jest.fn(),
});

describe('TasksService', () => {
    let tasksService;
    let taskRepository;

    beforeEach(async () => {
        const module = Test.createTestingModule({
           providers:[
               TasksService,
               { provide: TaskRepository, useFactory: mockTaskRepo },
           ], 
        }).compile();

        tasksService = await (await module).get<TasksService>(TasksService);
        taskRepository = (await module).get<TaskRepository>(TaskRepository);
    });

    describe('getTasks', () => {
        it('gets all tasks from the repository', async () => {
            taskRepository.getTasks.mockResolvedValue('someValue');
            expect(taskRepository.getTasks).not.toHaveBeenCalled();
            const filters: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'cleaning'};
            const result = await tasksService.getTasks(filters, mockUser);
            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(result).toEqual('someValue');
        });
    });
});