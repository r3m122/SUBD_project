import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configPG } from './config/typeorm.config';
import { StudentModule } from './student/student.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true,
      envFilePath: `.${process.env}.env`,
    }),
    TypeOrmModule.forRoot(configPG),
    StudentModule,
  ],
})
export class AppModule {}
