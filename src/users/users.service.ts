import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateUserDto) {
    const userExists = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password_hash: dto.password,
      },
    });

    return user;
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const userExists = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new HttpException('User do not exists', HttpStatus.NOT_FOUND);
    }

    const user = await this.prismaService.user.update({
      where: { id },
      data: {
        name: dto.name,
        email: dto.email,
        password_hash: dto.password,
      },
    });

    return user;
  }

  async remove(id: string) {
    const userExists = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!userExists) {
      throw new HttpException('User do not exists', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.user.delete({ where: { id } });
  }
}
