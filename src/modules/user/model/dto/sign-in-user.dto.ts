import {
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SigninUserDto {
  @IsString()
  @IsDefined()
  @IsEmail()
  @MinLength(2)
  @MaxLength(80)
  public username: string;

  @IsString()
  @IsDefined()
  @MinLength(2)
  @MaxLength(120)
  public password: string;
}
