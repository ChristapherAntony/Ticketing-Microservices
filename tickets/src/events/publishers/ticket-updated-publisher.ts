import { Publisher, Subjects, TicketUpdatedEvent } from '@cygnetops/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
