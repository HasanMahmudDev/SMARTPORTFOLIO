import type { NextFunction,Request,Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js'; import { fail } from '../utils/http.js';
type Claims={id:number;username:string;role:'super_admin'|'admin'};
export function requireAuth(req:Request,res:Response,next:NextFunction){const token=req.cookies?.access_token||req.headers.authorization?.replace(/^Bearer\s+/,'');if(!token)return fail(res,'Authentication required',401);try{req.user=jwt.verify(token,env.JWT_SECRET) as Claims;next();}catch{return fail(res,'Invalid or expired session',401);}}
export function optionalAuth(req:Request,res:Response,next:NextFunction){void res;const token=req.cookies?.access_token||req.headers.authorization?.replace(/^Bearer\s+/,'');if(token){try{req.user=jwt.verify(token,env.JWT_SECRET) as Claims;}catch{/* anonymous */}}next();}
export const requireSuperAdmin=(req:Request,res:Response,next:NextFunction)=>req.user?.role==='super_admin'?next():fail(res,'Super Admin access required',403);
