import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { ProductParamEntity } from '../product-param.entity';
import { ProductImageEntity } from '../product-image.entity';
import { ProductCategory } from '../product.entity';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsNumber()
  @Transform(({ value }) => (value !== undefined ? Number(value) : 0))
  price: number;

  @IsArray()
  params: Partial<ProductParamEntity>[];

  @IsArray()
  images: Partial<ProductImageEntity>[];
}
