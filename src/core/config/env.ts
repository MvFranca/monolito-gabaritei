
export const config = {
  PORT: process.env.PORT || 4000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  SECRET_KEY: process.env.SECRET_KEY || 'supersecret',
  JWT_SECRET: process.env.JWT_SECRET
};
