import { IsNotEmpty, IsString } from 'class-validator';
export class CreateTraceabilityDto {
  @IsNotEmpty()
  @IsString()
  of: string;
  @IsNotEmpty()
  @IsString()
  emp: string;
  @IsString()
  @IsNotEmpty()
  lot: string;
  @IsNotEmpty()
  @IsString()
  prepare: string;
  @IsString()
  @IsNotEmpty()
  rebut: string;
  @IsString()
  @IsNotEmpty()
  comment: string;
  @IsNotEmpty()
  @IsString()
  userName: string;
  @IsString()
  @IsNotEmpty()
  table:
    | 'TABLE DE S-ENSEMBLE'
    | 'TABLE DE SOUS-TRAITANTS'
    | 'TABLE DE BLOQCAGE'
    | 'TABLE DE MONTAGE'
    | "TABLE D'EXPORT"
    | 'TABLE DE DÉMONTAGE';
  @IsNotEmpty()
  @IsNotEmpty()
  matricule;
}
