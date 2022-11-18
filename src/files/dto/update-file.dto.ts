import { PartialType } from '@nestjs/swagger';
import { CreateFileDto } from './create-file.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateFileDto extends PartialType(CreateFileDto) {
  @IsNotEmpty()
  data: Array<object>;
}
