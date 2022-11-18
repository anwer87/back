import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductionService } from './production.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';

@Controller('api/production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async create(@Body() createProductionDto: CreateProductionDto) {
    return this.productionService.create(createProductionDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async findAll() {
    return await this.productionService.findAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productionService.findOne(+id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('/update/:id')
  async update(
    @Param() params,
    @Body() updateProductionDto: UpdateProductionDto,
  ) {
    return await this.productionService.update(+params.id, updateProductionDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:id')
  async remove(@Param() params) {
    return await this.productionService.remove(+params.id);
  }
}
