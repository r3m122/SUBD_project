import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentDto } from './dto/student.dto';
import { EditPostDto } from './dto/studentUpd.dto';
import { Student } from './entity/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  async getAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async getById(id: string): Promise<Student> {
    return await this.studentRepository.findOne(id);
  }

  async create(studentDto: StudentDto): Promise<Student> {
    const newStudent = this.studentRepository.create(studentDto);

    return this.studentRepository.save(newStudent);
  }

  async update(studentDto: EditPostDto): Promise<Student> {
    return this.studentRepository.save(studentDto);
  }

  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
