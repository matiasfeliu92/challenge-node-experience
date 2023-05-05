import Koa from 'koa'
const app = new Koa();
import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser'
import dotenv from 'dotenv'
dotenv.config()

import {router} from './src/routes/routes.js';

const port = 4000;

app.use(bodyParser());

app.use(router.routes())
app.use(router.allowedMethods())

mongoose.connect('mongodb://localhost/challenge', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});