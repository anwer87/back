import { Controller, Post, Body, Header, Res } from '@nestjs/common';
import { Response } from 'express';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Controller('api/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/export')
  @Header('Content-Type', 'text/xlsx')
  async export(@Body() createFileDto: CreateFileDto, @Res() res: Response) {
    const result = await this.filesService.export(createFileDto);
    res.download(`${result}`);
  }
  @Post('/import/production')
  async importProduction(@Body() importFileDto: UpdateFileDto) {
    return await this.filesService.importProduction(importFileDto);
  }

  @Post('/import/traceability')
  async importTraceability(@Body() importFileDto: UpdateFileDto) {
    return await this.filesService.importTraceability(importFileDto);
  }
}
