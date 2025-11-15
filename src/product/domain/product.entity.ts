import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductParamEntity } from './product-param.entity';
import { ProductImageEntity } from './product-image.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @OneToMany(
    () => ProductParamEntity,
    (productParam: ProductParamEntity) => productParam.id,
  )
  params: ProductParamEntity[];

  @OneToMany(
    () => ProductImageEntity,
    (productImage: ProductImageEntity) => productImage.id,
  )
  images: ProductImageEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
