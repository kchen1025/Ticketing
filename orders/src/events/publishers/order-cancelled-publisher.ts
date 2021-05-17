import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from '@ticketing-system/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
