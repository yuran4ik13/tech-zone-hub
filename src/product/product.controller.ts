import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './domain/dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }
}
