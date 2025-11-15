import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('productparams')
export class ProductParamEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  key: string;

  @Column('text')
  value: string;

  @ManyToOne(() => ProductEntity, (product: ProductEntity) => product.id)
  product: ProductEntity;
}
