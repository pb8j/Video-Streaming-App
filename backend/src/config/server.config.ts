import dotenv from 'dotenv';

dotenv.config(); // Load .env file

export const PORT = process.env.PORT || 3000;