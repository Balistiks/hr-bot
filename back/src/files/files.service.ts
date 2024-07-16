import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async getFileByName(filename: string): Promise<File | undefined> {
    return this.fileRepository.findOne({ where: { path: filename } });
  }

  async save(file: File): Promise<File> {
    return await this.fileRepository.save(file);
  }
}
