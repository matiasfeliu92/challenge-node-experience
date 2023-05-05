import Koa from 'koa'
const app = new Koa();
import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser'
import dotenv from 'dotenv'
dotenv.config()

import {router} from './routes/routes.js';
import { dbConnection } from './db/config.js';

const port = 4000;

app.use(bodyParser());

app.use(router.routes())
app.use(router.allowedMethods())

dbConnection()

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});