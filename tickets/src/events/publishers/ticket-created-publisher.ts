import { Publisher, Subjects, TicketCreatedEvent } from '@getmytickets/common';

//Publisher--base class   , Subjects--enum, 

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
