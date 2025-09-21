import path from 'path';
import dotenv from 'dotenv-safe';

dotenv.config()

// APP
export const NODE_ENV: string = process.env.NODE_ENV || "development";
export const APP_NAME: string = process.env.APP_NAME || "crude";
export const APP_PORT: number = Number(process.env.APP_PORT) || 8080;


// DATABASE
export const DB_HOST: string = process.env.DB_HOST || "localhost";
export const DB_PORT: number = Number(process.env.DB_PORT) || 5432;
export const DB_USER: string = process.env.DB_USER || 'crude';
export const DB_NAME: string = process.env.DB_NAME || "crude";
export const DB_PASS: string = process.env.DB_PASS || "crude";
export const DB_SYNC: boolean = NODE_ENV === 'development' ? true : false;
export const DB_LOG: boolean = NODE_ENV === 'development' ? true : false;