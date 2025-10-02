// src/applications/application.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Submission } from './application.entity';
import { ApplicationsController } from './application.controller';
import { ApplicationsService } from './applications.service';

@Module({
    imports: [SequelizeModule.forFeature([Submission])],
    controllers: [ApplicationsController],
    providers: [ApplicationsService]
})
export class ApplicationModule { }
