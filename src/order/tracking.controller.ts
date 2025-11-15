import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './order.service';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':trackingNumber')
  getByTrackingNumber(@Param('trackingNumber') trackingNumber: string) {
    return this.ordersService.getByTrackingNumber(trackingNumber);
  }
}
