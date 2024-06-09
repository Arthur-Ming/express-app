import { Db, MongoClient } from 'mongodb';
import config from '../common/config';
import mongoose from 'mongoose';

const dbUrl = config.mongoUrl;
const dbName = 'blogger_platform';

if (!dbUrl) {
  throw new Error('dbUrl not found!!!!');
}

//const client: MongoClient = new MongoClient(dbUrl);
//export const db: Db = client.db(dbName);

export const connectToDB = async () => {
  try {
    //  await client.connect();
    await mongoose.connect(dbUrl + '/' + dbName);
    console.log('connected to db');
    return true;
  } catch (e) {
    console.log('db error');
    console.log(e);
    //await client.close();
    await mongoose.disconnect();
    return false;
  }
};
