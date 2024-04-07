import { Db, MongoClient } from 'mongodb';
import config from '../common/config';

const dbUrl = config.mongoUrl;

if (!dbUrl) {
  throw new Error('dbUrl not found!!!!');
}

const client: MongoClient = new MongoClient(dbUrl);
export const db: Db = client.db('blogger_platform');

export const connectToDB = async () => {
  try {
    await client.connect();
    console.log('connected to db');
    return true;
  } catch (e) {
    console.log(e);
    await client.close();
    return false;
  }
};
