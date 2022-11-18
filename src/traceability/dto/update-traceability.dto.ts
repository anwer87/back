import { PartialType } from '@nestjs/swagger';
import { CreateTraceabilityDto } from './create-traceability.dto';

export class UpdateTraceabilityDto extends PartialType(CreateTraceabilityDto) {}
