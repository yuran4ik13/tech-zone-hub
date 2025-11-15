// src/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { OrdersController } from './order.controller';
import { TrackingController } from './tracking.controller';
import { OrdersService } from './order.service';
import { TrackingCronService } from './tracking-cron.service';
import { OrderEntity } from './domain/order.entity';
import { OrderItemEntity } from './domain/order-item.entity';
import { TrackingEventEntity } from './domain/tracking-event.entity';
import { ProductEntity } from '../product/domain/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemEntity,
      TrackingEventEntity,
      ProductEntity,
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [OrdersController, TrackingController],
  providers: [OrdersService, TrackingCronService],
  exports: [OrdersService],
})
export class OrdersModule {}
