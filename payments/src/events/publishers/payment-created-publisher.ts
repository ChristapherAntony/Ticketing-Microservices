import { Subjects, Publisher, PaymentCreatedEvent } from '@cygnetops/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
