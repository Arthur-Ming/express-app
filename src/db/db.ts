import config from '../common/config';
import mongoose from 'mongoose';

const dbUrl = config.mongoUrl;
const dbName = 'blogger_platform';

if (!dbUrl) {
  throw new Error('dbUrl not found!!!!');
}

export const connectToDB = async () => {
  try {
    await mongoose.connect(dbUrl + '/' + dbName);
    console.log('connected to db');
    return true;
  } catch (e) {
    console.log(e);

    await mongoose.disconnect();
    return false;
  }
};
