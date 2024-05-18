import { config } from 'dotenv';
config();

export default {
  port: process.env.PORT || 3003,
  mongoUrl: process.env.MONGO_URL,
  adminAuth: 'admin:qwerty',
  saltRounds: 4,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  accessTokenExpiresIn: '10s',
  refreshTokenExpiresIn: '20s',
  email: process.env.EMAIL || '',
  emailPassword: process.env.EMAIL_PASSWORD || '',
  cookieSecure: false,
};
