import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  // property of singleton, so we only have 1 instance of client
  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('connected to NATS');
        resolve();
      });

      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

// singleton export
export const natsWrapper = new NatsWrapper();
