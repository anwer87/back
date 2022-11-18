import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;
  @IsNotEmpty()
  @IsString()
  role: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  @IsString()
  matricule: string;
}

export class CrateUser extends UserDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class DeleteUser {
  @IsString()
  @IsNotEmpty()
  id: string;
}
