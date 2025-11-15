import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

export enum TrackingStatus {
  ORDER_PLACED = 'Order Placed',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  IN_TRANSIT = 'In Transit',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered',
  FAILED_DELIVERY = 'Failed Delivery Attempt',
  RETURNED = 'Returned to Sender',
}

@Entity('trackingevents')
export class TrackingEventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TrackingStatus })
  status: TrackingStatus;

  @Column('text')
  description: string;

  @Column('text')
  location: string;

  @Column('boolean', { default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => OrderEntity, (order) => order.trackingEvents, {
    onDelete: 'CASCADE',
  })
  order: OrderEntity;
}
