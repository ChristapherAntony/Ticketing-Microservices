import { Publisher, Subjects, TicketUpdatedEvent } from '@getmytickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
