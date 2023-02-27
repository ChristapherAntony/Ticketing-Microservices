import { Publisher, OrderCreatedEvent, Subjects } from '@cygnetops/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
