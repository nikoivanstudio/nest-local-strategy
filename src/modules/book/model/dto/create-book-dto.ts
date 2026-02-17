import {
  IsDefined,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsDefined()
  @MinLength(2)
  @MaxLength(40)
  public title: string;

  @IsString()
  @IsDefined()
  @MinLength(2)
  @MaxLength(120)
  public description: string;

  @IsString()
  @IsDefined()
  @MinLength(8)
  @MaxLength(120)
  public authors: string;

  @IsString()
  @IsOptional()
  public favorite?: string;

  @IsString()
  @IsOptional()
  public fileCover?: string;

  @IsString()
  @IsOptional()
  public fileName?: string;
}
