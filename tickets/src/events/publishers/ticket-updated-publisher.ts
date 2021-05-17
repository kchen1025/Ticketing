import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@ticketing-system/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
