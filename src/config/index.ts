import dotenv from 'dotenv';

dotenv.config();

export default {
  server: {
    dtbUri: process.env.DB_URI ?? '',
    port: process.env.PORT ?? '5000',
  },
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET ?? '',
    accessTokenExpired: process.env.ACCESS_TOKEN_EXPIRED ?? '6h',
  },
};
