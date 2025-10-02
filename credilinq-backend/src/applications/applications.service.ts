import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Submission  } from './application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
    constructor(
        @InjectModel(Submission)
        private applicationModel: typeof Submission,
    ) { }

    async create(createApplicationDto: CreateApplicationDto): Promise<Submission> {
        return this.applicationModel.create(createApplicationDto as any);
    }

    async findAll(): Promise<Submission[]> {
        return this.applicationModel.findAll({
            order: [['submittedAt', 'DESC']],
        });
    }
}
