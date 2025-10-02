import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ApplicationModule } from './applications/application.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [DatabaseModule, ApplicationModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
