// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'credilinq',
      autoLoadModels: true, // Load models automatically (use false in production with migrations)
      synchronize: false,  // Set to true only for development, false in production
    }),
  ],
  exports: [SequelizeModule], // Export to make it available to other modules
})
export class DatabaseModule {}
