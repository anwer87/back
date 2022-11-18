import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaClient } from '@prisma/client';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { UserDto, CrateUser } from './dto/user.dto';
// import { PrismaService } from './../prisma/prisma.service';
import * as argon from 'argon2';

Injectable();
export class UsersService {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async getAllUsers() {
    const users = await this.prisma.users.findMany();
    return users;
  }
  async getSpecificUser(name: string) {
    const user = await this.prisma.users.findUnique({
      where: { userName: name },
    });
    return user;
  }
  async crateUser(dto: CrateUser) {
    const password = await argon.hash(dto.password);
    try {
      const user = await this.prisma.users.create({
        data: {
          userName: dto.userName,
          password: password,
          matricule: dto.matricule,
          role: dto.role,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('user name already token');
        }
      } else {
        throw error;
      }
    }
  }
  async updateUser(name: string, data: UserDto) {
    // ts-ignore
    const user = await this.prisma.users.update({
      where: { userName: name },
      data,
    });
    return user;
  }
  async deleteUser(id: number) {
    const user = await this.prisma.users.delete({ where: { id: id } });
    return user;
  }
}
