import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});  //connection

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });   // 


  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)                      //manually acknowledge events
    .setDeliverAllAvailable()                    // deliver all events on restart
    .setDurableName('accounting-service');        // deliver events that missed





  const subscription = stan.subscribe(
    'ticket:created',
    'orders-service-queue-group',//queue group
    options
  ); //subscription created with channel subject name





  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack(); //to manually acknowledge the req
  });
});

process.on('SIGINT', () => stan.close());   //sent to a process by the operating system to interrupt its normal execution
process.on('SIGTERM', () => stan.close()); // generic termination signal used to cause a process to exit.

