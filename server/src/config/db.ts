import mysql from 'mysql2/promise';
import { env } from './env.js';
export const db = mysql.createPool({host:env.DB_HOST,port:env.DB_PORT,user:env.DB_USER,password:env.DB_PASSWORD,database:env.DB_NAME,waitForConnections:true,connectionLimit:10,decimalNumbers:true});
export async function checkDatabase(){const c=await db.getConnection();try{await c.ping();}finally{c.release();}}

