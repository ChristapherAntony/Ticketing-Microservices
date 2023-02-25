import { Publisher, OrderCreatedEvent, Subjects } from '@getmytickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
