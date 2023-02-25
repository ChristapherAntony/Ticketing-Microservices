import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';


const start = async () => {
  //...........................env check.............................//
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }                  //if we do not set jwt_key 
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }                  //ts error override 
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }

//................................................................//
  try {
    //connect  
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    //shutdown
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());


    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.MONGO_URI);   // mogo url from env
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  } 

  // try {
  //   await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     useCreateIndex: true
  //   });
  //   console.log('Connected to MongoDb');
  // } catch (err) {
  //   console.error(err);
  // }

  app.listen(3000, () => {console.log('Listening on port 3000!!!!!!!!');});
};
start();