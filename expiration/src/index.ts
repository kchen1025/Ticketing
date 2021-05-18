import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';

const start = async () => {
  console.log('starting expiration');
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be definedd');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be definedd');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be definedd');
  }

  // you want to keep this out of a try catch because if you fail to connect to nats or mongo, express won't startup
  // the container will exit immediately, and k8s will attempt to kick the container back up to retry.
  // if you have a try catch, the express server starts up and then you don't have your nats/mongo connection
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
  } catch (err) {
    console.error('erro with nats', err);
    process.exit();
  }

  natsWrapper.client.on('close', () => {
    console.log('NATS connection closed');
    process.exit();
  });
  process.on('SIGINT', () => natsWrapper.client.close());
  process.on('SIGTERM', () => natsWrapper.client.close());

  new OrderCreatedListener(natsWrapper.client).listen();
};

start();
