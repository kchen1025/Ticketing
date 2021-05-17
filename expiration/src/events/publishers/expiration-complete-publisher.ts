import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@ticketing-system/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
