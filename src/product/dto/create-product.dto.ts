import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';

class ProductCharacteristicsDto {
  @IsString()
  value: string;

  @IsString()
  name: string;
}
export class CreateProductDto {
  @IsString()
  image: string;

  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  oldPrice?: number;

  @IsNumber()
  credit: number;

  @IsString()
  description: string;

  @IsString()
  advantages: string;

  @IsString()
  disAdvantages: string;

  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsArray()
  @ValidateNested()
  @Type(() => ProductCharacteristicsDto)
  characteristics: ProductCharacteristicsDto[];
}
