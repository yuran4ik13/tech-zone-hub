import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory, ProductEntity } from './domain/product.entity';
import { CreateProductDto } from './domain/dto/product.dto';
import slugify from 'slugify';
import { ProductParamEntity } from './domain/product-param.entity';
import { ProductImageEntity } from './domain/product-image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly products: Repository<ProductEntity>,
    @InjectRepository(ProductParamEntity)
    private readonly params: Repository<ProductParamEntity>,
    @InjectRepository(ProductImageEntity)
    private readonly images: Repository<ProductImageEntity>,
  ) {}

  async create(data: CreateProductDto) {
    const existingProduct = await this.products.findOne({
      where: {
        slug: slugify(data.title, {
          lower: true,
        }),
      },
    });
    if (existingProduct)
      throw new BadRequestException('Product with same title already exists');

    const product = await this.products.save({
      ...data,
      slug: slugify(data.title, {
        lower: true,
      }),
    });

    return product;
  }

  async getBySlug(slug: string) {
    const productExists = await this.products.findOne({
      where: {
        slug,
      },
      relations: ['params', 'images'],
    });
    if (!productExists)
      throw new NotFoundException('Product with same slug was not found');

    return productExists;
  }

  async search(query: string, category?: ProductCategory) {
    const qb = this.products.createQueryBuilder('product');

    qb.where(`(product.title ILIKE :q OR product.description ILIKE :q)`, {
      q: `%${query ?? ''}%`,
    });

    if (category) {
      qb.andWhere(`product.category = :category`, { category });
    }

    qb.leftJoinAndSelect('product.images', 'image');

    return qb.getMany();
  }
}
