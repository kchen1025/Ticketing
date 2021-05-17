import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from '@ticketing-system/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
