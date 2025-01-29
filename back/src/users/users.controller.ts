import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { EmployeesService } from '../employees/employees.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SetDateDto } from './dto/set-date.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import * as process from 'process';
import { Between, DeleteResult } from 'typeorm';
import { AnswersService } from '../answers/answers.service';


@Controller('users')
export class UsersController {
  constructor(
      private readonly usersService: UsersService,
      private readonly employeesService: EmployeesService,
      private readonly httpService: HttpService,
      private readonly answersService: AnswersService,
  ) {
  }

 @Get('studying')
  async getAll(): Promise<User[]> {
    const now = new Date();
    const threeDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, -14, 0, 0)

    const sixDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, -14, 0, 0)

    return await this.usersService.find({
      where: {
        status: 'обучается',
        registeredAt: Between(sixDaysAgo, threeDaysAgo),
      },
    });
  }


  @Get('byTgId')
  async findByTgId(@Query('tgId') tgId: number): Promise<User> {
    return await this.usersService.findOne({
      where: {tgId},
      relations: [
        'course',
        'question',
        'answers',
        'answers.stage',
        'stage',
        'answers.stage.course',
      ],
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.usersService.findOne({
      where: {id},
      relations: ['course', 'question'],
    });
  }

  @Get()
  async find(@Query('request') request?: string): Promise<User[]> {
    return await this.usersService.find({
      where: request ? JSON.parse(request) : null,
    });
  }

  @Post()
  async save(@Body() user: CreateUserDto): Promise<User> {
    user.employee = await this.employeesService.getWithMinimalUsers();
    return await this.usersService.save(user);
  }

  @Post('date')
  async setDate(
      @Body() data: SetDateDto,
  ): Promise<Observable<AxiosResponse<any>>> {
    const user = await this.usersService.findOne({
      where: {
        id: data.userId,
      },
      order: {
        answers: {
          id: 'ASC',
          stage: {
            number: 'ASC',
          },
        },
      },
      relations: [
        'employee',
        'answers',
        'answers.stage',
        'answers.stage.course',
      ],
    });
    const date = data.date;
    user.selectedDate = date;
    await this.usersService.save(user);
    const dateString = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    return this.httpService.post(
        'http://web:8080/users/date',
        {
          user: user,
          date: dateString,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.SECRET_TOKEN}`,
          },
        },
    );
  }

  @Patch(':tgId/reset')
  async reset(@Param('tgId') tgId: number) {
    const answers = await this.answersService.findMany({
      where: {
        user: { tgId },
      },
    });
    for (const answer of answers) {
      await this.answersService.delete(answer);
    }
    const user = await this.usersService.findOne({
      where: { tgId },
    });
    return await this.usersService.delete(user);
  }

  @Patch()
  async update(@Body() user: UpdateUserDto): Promise<User> {
    return await this.usersService.save(user);
  }
}
