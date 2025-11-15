import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from 'typeorm';
import { OrderEntity, OrderStatus } from './domain/order.entity';
import {
  TrackingEventEntity,
  TrackingStatus,
} from './domain/tracking-event.entity';

@Injectable()
export class TrackingCronService {
  private readonly logger = new Logger(TrackingCronService.name);

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orders: Repository<OrderEntity>,
    @InjectRepository(TrackingEventEntity)
    private readonly trackingEvents: Repository<TrackingEventEntity>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async updateTrackingEvents() {
    this.logger.log('Starting tracking events update...');

    const activeOrders = await this.orders.find({
      where: {
        status: Not(
          In([
            OrderStatus.DELIVERED,
            OrderStatus.CANCELLED,
            OrderStatus.REFUNDED,
          ]),
        ),
      },
      relations: ['trackingEvents'],
    });

    this.logger.log(`Found ${activeOrders.length} active orders to process`);

    for (const order of activeOrders) {
      try {
        await this.processOrder(order);
      } catch (error) {
        this.logger.error(
          `Error processing order ${order.orderNumber}:`,
          error,
        );
      }
    }

    this.logger.log('Tracking events update completed');
  }

  private async processOrder(order: OrderEntity) {
    const lastEvent = this.getLastCompletedEvent(order.trackingEvents);

    const nextStatus = this.getNextTrackingStatus(lastEvent?.status);

    if (!nextStatus) {
      return;
    }

    this.logger.log(
      `Creating new tracking event for order ${order.orderNumber}: ${nextStatus}`,
    );

    const newEvent = this.trackingEvents.create({
      order,
      status: nextStatus,
      description: this.getEventDescription(nextStatus),
      location: this.generateLocation(order, nextStatus),
      isCompleted: true,
      timestamp: new Date(),
    });

    await this.trackingEvents.save(newEvent);

    const newOrderStatus = this.mapTrackingToOrderStatus(nextStatus);
    if (newOrderStatus && newOrderStatus !== order.status) {
      order.status = newOrderStatus;

      if (newOrderStatus === OrderStatus.DELIVERED) {
        order.deliveredAt = new Date();
      }

      await this.orders.save(order);
    }

    this.logger.log(
      `Successfully created tracking event for order ${order.orderNumber}`,
    );
  }

  private getLastCompletedEvent(
    events: TrackingEventEntity[],
  ): TrackingEventEntity | null {
    const completedEvents = events
      .filter((e) => e.isCompleted)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return completedEvents[0] || null;
  }

  private getNextTrackingStatus(
    currentStatus?: TrackingStatus,
  ): TrackingStatus | null {
    const statusFlow = [
      TrackingStatus.ORDER_PLACED,
      TrackingStatus.PROCESSING,
      TrackingStatus.SHIPPED,
      TrackingStatus.IN_TRANSIT,
      TrackingStatus.OUT_FOR_DELIVERY,
      TrackingStatus.DELIVERED,
    ];

    if (!currentStatus) {
      return TrackingStatus.ORDER_PLACED;
    }

    const currentIndex = statusFlow.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === statusFlow.length - 1) {
      return null;
    }

    return statusFlow[currentIndex + 1];
  }

  private getEventDescription(status: TrackingStatus): string {
    const descriptions = {
      [TrackingStatus.ORDER_PLACED]:
        'Your order has been received and is being processed',
      [TrackingStatus.PROCESSING]: 'Your order is being prepared for shipment',
      [TrackingStatus.SHIPPED]: 'Package has been picked up by carrier',
      [TrackingStatus.IN_TRANSIT]: 'Package is on the way to destination',
      [TrackingStatus.OUT_FOR_DELIVERY]: 'Package is out for delivery today',
      [TrackingStatus.DELIVERED]: 'Package has been delivered successfully',
      [TrackingStatus.FAILED_DELIVERY]:
        'Delivery attempt failed - will retry tomorrow',
      [TrackingStatus.RETURNED]: 'Package is being returned to sender',
    };

    return descriptions[status] || 'Status updated';
  }

  private generateLocation(order: OrderEntity, status: TrackingStatus): string {
    const locations = {
      [TrackingStatus.ORDER_PLACED]: `${order.shippingCity} Distribution Center`,
      [TrackingStatus.PROCESSING]: `${order.shippingCity} Warehouse`,
      [TrackingStatus.SHIPPED]: `${order.shippingCity} Sorting Facility`,
      [TrackingStatus.IN_TRANSIT]: this.getRandomTransitCity(
        order.shippingCountry,
      ),
      [TrackingStatus.OUT_FOR_DELIVERY]: `${order.shippingCity} Local Depot`,
      [TrackingStatus.DELIVERED]: `${order.shippingAddress}, ${order.shippingCity}`,
      [TrackingStatus.FAILED_DELIVERY]: `${order.shippingAddress}, ${order.shippingCity}`,
      [TrackingStatus.RETURNED]: `${order.shippingCity} Return Center`,
    };

    return locations[status] || order.shippingCity;
  }

  private getRandomTransitCity(country: string): string {
    const transitCities = {
      Slovakia: ['Vienna Transit Hub', 'Prague Transit Hub', 'Budapest Hub'],
      'Czech Republic': ['Vienna Transit Hub', 'Berlin Hub', 'Warsaw Hub'],
      Poland: ['Berlin Hub', 'Vienna Transit Hub', 'Prague Transit Hub'],
      Hungary: ['Vienna Transit Hub', 'Belgrade Hub', 'Zagreb Hub'],
      Austria: ['Munich Hub', 'Zurich Hub', 'Prague Transit Hub'],
    };

    const cities = transitCities[country] || ['International Transit Hub'];
    return cities[Math.floor(Math.random() * cities.length)];
  }

  private mapTrackingToOrderStatus(
    trackingStatus: TrackingStatus,
  ): OrderStatus | null {
    const statusMap = {
      [TrackingStatus.ORDER_PLACED]: OrderStatus.PENDING,
      [TrackingStatus.PROCESSING]: OrderStatus.PROCESSING,
      [TrackingStatus.SHIPPED]: OrderStatus.SHIPPED,
      [TrackingStatus.IN_TRANSIT]: OrderStatus.SHIPPED,
      [TrackingStatus.OUT_FOR_DELIVERY]: OrderStatus.SHIPPED,
      [TrackingStatus.DELIVERED]: OrderStatus.DELIVERED,
    };

    return statusMap[trackingStatus] || null;
  }

  async triggerManualUpdate() {
    this.logger.log('Manual tracking update triggered');
    await this.updateTrackingEvents();
  }
}
