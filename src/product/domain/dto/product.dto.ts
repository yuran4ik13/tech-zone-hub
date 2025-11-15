import { IsArray, IsEnum, IsString } from 'class-validator';
import { ProductParamEntity } from '../product-param.entity';
import { ProductImageEntity } from '../product-image.entity';
import { ProductCategory } from '../product.entity';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(ProductCategory)
  category: ProductCategory;

  @IsArray()
  params: Partial<ProductParamEntity>[];

  @IsArray()
  images: Partial<ProductImageEntity>[];
}
