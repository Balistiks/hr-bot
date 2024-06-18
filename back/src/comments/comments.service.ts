import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entitites/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async save(comment: CreateCommentDto): Promise<Comment> {
    return await this.commentRepository.save(comment);
  }
}
