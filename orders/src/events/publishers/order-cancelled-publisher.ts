import { Subjects, Publisher, OrderCancelledEvent } from '@cygnetops/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
