import { ArgumentMetadata, BadRequestException, PipeTransform, Logger } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform{
    
    private logger = new Logger('TaskStatusValidationPipe');

    readonly allowedStatuses = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN
    ];
    
    transform(value: any) {
        value = value.toUpperCase();
        this.logger.debug(`status passed is ${value}`);
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is an invalid status`);
        }
        
        return value;
    }

    private isStatusValid(status: any){
        const idx = this.allowedStatuses.indexOf(status);
        this.logger.debug(`status idx is ${idx}`);
        return idx !== -1;
    }
    
}