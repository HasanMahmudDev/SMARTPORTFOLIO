import bcrypt from 'bcrypt'; import { db } from '../config/db.js';
const username=process.env.ADMIN_USERNAME||'touhidhr',password=process.env.ADMIN_PASSWORD,email=process.env.ADMIN_EMAIL||null;
if(!password||password.length<10){console.error('ADMIN_PASSWORD must be set and contain at least 10 characters.');process.exit(1);}
const hash=await bcrypt.hash(password,12);await db.execute("INSERT INTO admin_users (username,email,password_hash,role,is_active) VALUES (?,?,?,'super_admin',1) ON DUPLICATE KEY UPDATE email=VALUES(email),password_hash=VALUES(password_hash),role='super_admin',is_active=1",[username,email,hash]);console.log(`Super Admin '${username}' created/updated with a bcrypt hash.`);await db.end();

