import { app } from './app.js'; import { checkDatabase } from './config/db.js'; import { env } from './config/env.js';
app.listen(env.PORT,()=>{console.log(`SmartPortfolio API listening on http://localhost:${env.PORT}`);checkDatabase().then(()=>console.log('MySQL connected')).catch(e=>console.error('MySQL connection failed:',e.message));});

