import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  
  await app.listen(3001);
  console.log('Backend running on http://localhost:3001');
}
bootstrap();
