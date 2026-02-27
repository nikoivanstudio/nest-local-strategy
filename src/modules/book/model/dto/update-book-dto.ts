import {
  IsDefined,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export interface IBook {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly authors: string;
  readonly favorite?: string;
  readonly fileCover?: string;
  readonly fileName?: string;
}

export class UpdateBookDto {
  @IsString()
  @IsDefined()
  @MinLength(12)
  @MaxLength(40)
  public id: string;

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
