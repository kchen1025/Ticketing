import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@ticketing-system/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
