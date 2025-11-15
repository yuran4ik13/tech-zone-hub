import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './domain/dto/product.dto';
import { ProductCategory } from './domain/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get('search')
  search(
    @Query('query') query: string,
    @Query('category', new ParseEnumPipe(ProductCategory, { optional: true }))
    category: ProductCategory,
  ) {
    return this.productsService.search(query, category);
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.productsService.getBySlug(slug);
  }
}
