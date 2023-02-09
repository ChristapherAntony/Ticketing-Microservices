import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payments-service';


  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data);

    console.log(data.id);
    console.log(data.title);
    console.log(data.price);

    msg.ack();
  }
}


//before type subject
// export class TicketCreatedListener extends Listener {
//   subject = 'ticket:created';
//   queueGroupName = 'payments-service';

//   onMessage(data: any, msg: Message) {
//     console.log('Event data!', data);

//     msg.ack();
//   }
// }
