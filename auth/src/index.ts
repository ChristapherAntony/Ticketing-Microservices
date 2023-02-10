import mongoose from 'mongoose';
import { app } from './app';


const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }                  //if we do not set jwt_key 
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }                  //ts error override 

  try {
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