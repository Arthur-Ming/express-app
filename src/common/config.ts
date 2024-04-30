import { config } from 'dotenv';
config();

export default {
  port: process.env.PORT || 3003,
  mongoUrl: process.env.MONGO_URL,
  adminAuth: 'admin:qwerty',
  saltRounds: 4,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpiresIn: '6h',
};
