import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './domain/product.entity';
import { ProductParamEntity } from './domain/product-param.entity';
import { ProductImageEntity } from './domain/product-image.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductParamEntity,
      ProductImageEntity,
    ]),
  ],
})
export class ProductsModule {}
