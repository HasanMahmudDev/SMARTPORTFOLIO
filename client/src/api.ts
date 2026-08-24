import axios from 'axios';
export const api=axios.create({baseURL:'/api',withCredentials:true,headers:{'Content-Type':'application/json'}});
api.interceptors.response.use(r=>r,async e=>{const original=e.config;if(e.response?.status===401&&!original?._retry&&!String(original?.url).includes('/auth/')){original._retry=true;try{await api.post('/auth/refresh');return api(original);}catch{/* handled by route */}}return Promise.reject(e);});
export type ApiResult<T>={success:boolean;message:string;data:T;errors?:unknown[]};
export const getData=async<T>(url:string)=>((await api.get<ApiResult<T>>(url)).data.data);

