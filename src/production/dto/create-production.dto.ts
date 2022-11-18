import { IsNotEmpty, IsString } from 'class-validator';
export class CreateProductionDto {
  @IsString()
  @IsNotEmpty()
  Matricule: string;
  @IsString()
  @IsNotEmpty()
  User: string;
  @IsString()
  @IsNotEmpty()
  Produit: string;
  @IsString()
  @IsNotEmpty()
  Lot: string;
  @IsString()
  @IsNotEmpty()
  Of: string;
  @IsString()
  @IsNotEmpty()
  Reference: string;
  @IsString()
  @IsNotEmpty()
  Table: string;
  @IsString()
  @IsNotEmpty()
  Type: string;
  @IsString()
  @IsNotEmpty()
  Commentaire: string;
  @IsString()
  @IsNotEmpty()
  Qte_Saisi: string;
  @IsString()
  @IsNotEmpty()
  Date_doperation: string;
}
