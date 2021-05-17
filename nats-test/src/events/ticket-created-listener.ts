import { Listener } from '@ticketing-system/common';
import nats, { Message, Stan } from 'node-nats-streaming';
import { TicketCreatedEvent } from '@ticketing-system/common';
import { Subjects } from '@ticketing-system/common';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('event data', data);

    msg.ack();
  }
}
