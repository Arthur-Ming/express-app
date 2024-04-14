import { config } from 'dotenv';
config();

export default {
  port: process.env.PORT || 3003,
  mongoUrl: process.env.MONGO_URL,
  adminAuth: 'admin:qwerty',
};
