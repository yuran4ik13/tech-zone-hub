import { IsArray, IsString } from 'class-validator';
import { ProductParamEntity } from '../product-param.entity';
import { ProductImageEntity } from '../product-image.entity';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  params: Partial<ProductParamEntity>[];

  @IsArray()
  images: Partial<ProductImageEntity>[];
}
