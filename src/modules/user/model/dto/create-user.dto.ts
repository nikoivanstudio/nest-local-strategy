import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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
  public password: string;

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
