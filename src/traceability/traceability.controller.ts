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
import { TraceabilityService } from './traceability.service';
import { CreateTraceabilityDto } from './dto/create-traceability.dto';
import { UpdateTraceabilityDto } from './dto/update-traceability.dto';

@Controller('api/traceability')
export class TraceabilityController {
  constructor(private readonly traceabilityService: TraceabilityService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async create(@Body() createTraceabilityDto: CreateTraceabilityDto) {
    return await this.traceabilityService.create(createTraceabilityDto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async findAll() {
    return await this.traceabilityService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete')
  remove() {
    return this.traceabilityService.remove();
  }
}
