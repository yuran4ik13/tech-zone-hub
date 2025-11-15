import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('productimages')
export class ProductImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  path: string;

  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.images, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;
}
