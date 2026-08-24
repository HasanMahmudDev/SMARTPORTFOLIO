import type { ErrorRequestHandler,RequestHandler } from 'express'; import multer from 'multer'; import { env } from '../config/env.js';
export const notFound:RequestHandler=(req,res)=>res.status(404).json({success:false,message:`Route ${req.method} ${req.path} not found`,errors:[]});
export const errorHandler:ErrorRequestHandler=(err,req,res,next)=>{void req;void next;const status=err instanceof multer.MulterError?400:(Number(err.status)||500);res.status(status).json({success:false,message:status===500&&env.NODE_ENV==='production'?'Internal server error':String(err.message||'Internal server error'),errors:[],...(env.NODE_ENV==='development'&&status===500?{stack:err.stack}:{})});};

