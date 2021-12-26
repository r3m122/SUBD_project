import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StudentDto } from './dto/student.dto';
import { EditPostDto } from './dto/studentUpd.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getAll() {
    return this.studentService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.studentService.getById(id);
  }

  @Post()
  async create(@Body() studentDto: StudentDto) {
    return this.studentService.create(studentDto);
  }

  @Put()
  async update(@Body() studentDto: EditPostDto) {
    return this.studentService.update(studentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.studentService.remove(id);
  }
}
