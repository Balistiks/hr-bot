import { Body, Controller, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entitites/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async save(@Body() comment: CreateCommentDto): Promise<Comment> {
    return await this.commentsService.save(comment);
  }
}
