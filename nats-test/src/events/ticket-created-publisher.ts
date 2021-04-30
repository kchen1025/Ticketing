import { Publisher } from '@ticketing-system/common';
import { TicketCreatedEvent } from '@ticketing-system/common';
import { Subjects } from '@ticketing-system/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
