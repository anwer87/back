import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';

@Injectable()
export class ProductionService {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(createProductionDto: CreateProductionDto) {
    try {
      const production = await this.prisma.production.create({
        data: createProductionDto,
      });
      return production;
    } catch (error) {
      console.log(error); // remove it after testing
    }
  }

  async findAll() {
    try {
      const productions = await this.prisma.production.findMany();
      return productions;
    } catch (error) {
      console.log(error); // remove it after testing
    }
  }

  async findOne(id: number) {
    try {
      const production = await this.prisma.production.findUnique({
        where: { id: id },
      });
      return production;
    } catch (error) {
      console.log(error); // remove it after testing
    }
  }

  async update(id: number, updateProductionDto: UpdateProductionDto) {
    try {
      const production = await this.prisma.production.update({
        where: { id: id },
        data: updateProductionDto,
      });
      return production;
    } catch (error) {
      console.log(error); // remove it after testing
    }
  }

  async remove(id: number) {
    try {
      const production = await this.prisma.production.delete({
        where: { id: id },
      });
      return production;
    } catch (error) {
      console.log(error); // remove it after testing
    }
  }
}
