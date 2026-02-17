import { IsDefined, IsOptional, IsString, Max, Min } from 'class-validator';

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
  @Min(12)
  @Max(40)
  public id: string;

  @IsString()
  @IsDefined()
  @Min(2)
  @Max(40)
  public title: string;

  @IsString()
  @IsDefined()
  @Min(2)
  @Max(120)
  public description: string;

  @IsString()
  @IsDefined()
  @Min(8)
  @Max(120)
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
