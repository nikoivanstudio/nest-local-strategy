import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsUUID()
  public id: string;

  @IsString()
  @IsDefined()
  @IsEmail()
  @MinLength(2)
  @MaxLength(80)
  public email: string;

  @IsString()
  @IsDefined()
  @MinLength(2)
  @MaxLength(120)
  public firstName: string;

  @IsString()
  @MaxLength(120)
  @IsOptional()
  public lastName: string;
}
