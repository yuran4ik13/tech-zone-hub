import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItemEntity } from './order-item.entity';
import { TrackingEventEntity } from './tracking-event.entity';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  CARD = 'card',
  PAYPAL = 'paypal',
  CASH_ON_DELIVERY = 'cash_on_delivery',
}

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  orderNumber: string;

  @Column('text', { unique: true })
  trackingNumber: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  // Customer Information
  @Column('text')
  customerFirstName: string;

  @Column('text')
  customerLastName: string;

  @Column('text')
  customerEmail: string;

  @Column('text')
  customerPhone: string;

  @Column('text')
  shippingAddress: string;

  @Column('text')
  shippingCity: string;

  @Column('text')
  shippingPostalCode: string;

  @Column('text')
  shippingCountry: string;

  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2 })
  shippingCost: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column('text', { nullable: true })
  notes: string;

  @Column('text', { default: 'DHL Express' })
  carrier: string;

  @Column('timestamp', { nullable: true })
  estimatedDelivery: Date;

  @Column('timestamp', { nullable: true })
  deliveredAt: Date;

  @OneToMany(() => OrderItemEntity, (item) => item.order, {
    cascade: ['insert'],
  })
  items: OrderItemEntity[];

  @OneToMany(() => TrackingEventEntity, (event) => event.order, {
    cascade: ['insert'],
  })
  trackingEvents: TrackingEventEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
