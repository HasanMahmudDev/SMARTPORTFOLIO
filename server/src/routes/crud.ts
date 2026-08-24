import { Router } from 'express'; import { create,list,one,remove,resources,update,type Resource } from '../services/crud.js'; import { requireAuth } from '../middleware/auth.js'; import { fail,ok } from '../utils/http.js';
export const crudRouter=Router();
crudRouter.param('resource',(req,res,next,value)=>Object.hasOwn(resources,value)?next():fail(res,'Unknown resource',404));
crudRouter.get('/:resource',async(req,res,next)=>{try{ok(res,await list(req.params.resource as Resource,req.query));}catch(e){next(e);}});
crudRouter.get('/:resource/:id',async(req,res,next)=>{try{const row=await one(req.params.resource as Resource,Number(req.params.id));row?ok(res,row):fail(res,'Record not found',404);}catch(e){next(e);}});
crudRouter.post('/:resource',requireAuth,async(req,res,next)=>{try{ok(res,await create(req.params.resource as Resource,req.body),'Created successfully',201);}catch(e){next(e);}});
crudRouter.put('/:resource/:id',requireAuth,async(req,res,next)=>{try{const row=await update(req.params.resource as Resource,Number(req.params.id),req.body);row?ok(res,row,'Updated successfully'):fail(res,'Record not found',404);}catch(e){next(e);}});
crudRouter.delete('/:resource/:id',requireAuth,async(req,res,next)=>{try{(await remove(req.params.resource as Resource,Number(req.params.id)))?ok(res,{},'Deleted successfully'):fail(res,'Record not found',404);}catch(e){next(e);}});
