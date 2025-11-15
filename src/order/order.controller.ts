import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './domain/dto/create-order.dto';
import { TrackingCronService } from './tracking-cron.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly trackingCronService: TrackingCronService,
  ) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @Get(':orderId')
  getById(@Param('orderId', ParseUUIDPipe) orderId: string) {
    return this.ordersService.getById(orderId);
  }

  @Post('tracking/update')
  async triggerTrackingUpdate() {
    await this.trackingCronService.triggerManualUpdate();
    return { message: 'Tracking update triggered successfully' };
  }
}
