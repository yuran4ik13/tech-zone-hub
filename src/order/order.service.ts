// src/orders/orders.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity, OrderStatus } from './domain/order.entity';
import { OrderItemEntity } from './domain/order-item.entity';
import {
  TrackingEventEntity,
  TrackingStatus,
} from './domain/tracking-event.entity';
import { CreateOrderDto } from './domain/dto/create-order.dto';
import { ProductEntity } from '../product/domain/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orders: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItems: Repository<OrderItemEntity>,
    @InjectRepository(TrackingEventEntity)
    private readonly trackingEvents: Repository<TrackingEventEntity>,
    @InjectRepository(ProductEntity)
    private readonly products: Repository<ProductEntity>,
  ) {}

  async create(data: CreateOrderDto) {
    const productIds = data.items.map((item) => item.productId);
    const products = await this.products.find({
      where: productIds.map((id) => ({ id })),
    });

    if (products.length !== productIds.length) {
      throw new BadRequestException('One or more products not found');
    }

    for (const item of data.items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new BadRequestException(`Product ${item.productId} not found`);
      }
      if (Math.abs(product.price - item.price) > 0.01) {
        throw new BadRequestException(
          `Price mismatch for product ${product.title}`,
        );
      }
    }

    const orderNumber = this.generateOrderNumber();
    const trackingNumber = this.generateTrackingNumber();

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(
      estimatedDelivery.getDate() + Math.floor(Math.random() * 3) + 3,
    );

    const order = await this.orders.save({
      orderNumber,
      trackingNumber,
      status: OrderStatus.PENDING,
      customerFirstName: data.customer.firstName,
      customerLastName: data.customer.lastName,
      customerEmail: data.customer.email,
      customerPhone: data.customer.phone,
      shippingAddress: data.shippingAddress.address,
      shippingCity: data.shippingAddress.city,
      shippingPostalCode: data.shippingAddress.postalCode,
      shippingCountry: data.shippingAddress.country,
      paymentMethod: data.paymentMethod,
      subtotal: data.subtotal,
      shippingCost: data.shippingCost,
      total: data.total,
      notes: data.notes,
      estimatedDelivery,
    });

    const orderItemsData = data.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        productId: item.productId,
        productTitle: product.title,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
        order: { id: order.id },
      };
    });

    await this.orderItems.save(orderItemsData);

    await this.trackingEvents.save({
      status: TrackingStatus.ORDER_PLACED,
      description: 'Your order has been received and is being processed',
      location: `${data.shippingAddress.city} Distribution Center`,
      isCompleted: true,
      order: { id: order.id },
    });

    return {
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      trackingNumber: order.trackingNumber,
      status: order.status,
      message: 'Order created successfully',
    };
  }

  async getById(orderId: string) {
    const order = await this.orders.findOne({
      where: { id: orderId },
      relations: ['items', 'trackingEvents'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return this.formatOrderResponse(order);
  }

  async getByTrackingNumber(trackingNumber: string) {
    console.log(trackingNumber);
    const order = await this.orders.findOne({
      where: { id: trackingNumber },
      relations: ['trackingEvents'],
      order: {
        trackingEvents: {
          timestamp: 'ASC',
        },
      },
    });

    if (!order) {
      throw new NotFoundException(
        `Order with tracking number ${trackingNumber} not found`,
      );
    }

    return this.formatTrackingResponse(order);
  }

  async updateStatus(orderId: string, status: OrderStatus) {
    const order = await this.orders.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    order.status = status;

    if (status === OrderStatus.DELIVERED) {
      order.deliveredAt = new Date();
    }

    return this.orders.save(order);
  }

  private formatOrderResponse(order: OrderEntity) {
    return {
      orderId: order.id,
      orderNumber: order.orderNumber,
      trackingNumber: order.trackingNumber,
      status: order.status,
      total: parseFloat(order.total.toString()),
      estimatedDelivery: this.formatEstimatedDelivery(order.estimatedDelivery),
      customer: {
        firstName: order.customerFirstName,
        lastName: order.customerLastName,
        email: order.customerEmail,
        phone: order.customerPhone,
      },
      shippingAddress: {
        address: order.shippingAddress,
        city: order.shippingCity,
        postalCode: order.shippingPostalCode,
        country: order.shippingCountry,
      },
      items: order.items.map((item) => ({
        productId: item.productId,
        title: item.productTitle,
        quantity: item.quantity,
        price: parseFloat(item.price.toString()),
        total: parseFloat(item.total.toString()),
      })),
      paymentMethod: order.paymentMethod,
      subtotal: parseFloat(order.subtotal.toString()),
      shippingCost: parseFloat(order.shippingCost.toString()),
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    };
  }

  private formatTrackingResponse(order: OrderEntity) {
    return {
      trackingNumber: order.trackingNumber,
      orderNumber: order.orderNumber,
      currentStatus: this.getCurrentStatusDisplay(order.status),
      estimatedDelivery: this.formatEstimatedDelivery(order.estimatedDelivery),
      carrier: order.carrier,
      shippingAddress: {
        address: order.shippingAddress,
        city: order.shippingCity,
        postalCode: order.shippingPostalCode,
        country: order.shippingCountry,
      },
      events: order.trackingEvents.map((event) => ({
        id: event.id,
        status: event.status,
        description: event.description,
        location: event.location,
        timestamp: event.timestamp.toISOString(),
        isCompleted: event.isCompleted,
      })),
    };
  }

  private getCurrentStatusDisplay(status: OrderStatus): string {
    const statusMap = {
      [OrderStatus.PENDING]: 'Pending',
      [OrderStatus.PROCESSING]: 'Processing',
      [OrderStatus.SHIPPED]: 'Shipped',
      [OrderStatus.DELIVERED]: 'Delivered',
      [OrderStatus.CANCELLED]: 'Cancelled',
      [OrderStatus.REFUNDED]: 'Refunded',
    };
    return statusMap[status] || status;
  }

  private formatEstimatedDelivery(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  private generateOrderNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
    return `ORD-${year}-${random}`;
  }

  private generateTrackingNumber(): string {
    const prefix = 'TRK';
    const random = Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, '0');
    return `${prefix}${random}`;
  }
}
