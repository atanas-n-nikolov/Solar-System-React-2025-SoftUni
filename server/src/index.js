import express from 'express';
import routes from './routes.js';
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose';
import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(authMiddleware);
app.use(routes);

const url = 'mongodb://localhost:27017';

mongoose.connect(url, { dbName: 'Planets'})
  .then(() => console.log('DB Connected!'))
  .catch((err) => console.log(`DB failed: #{err}`));

app.listen(3000, () => console.log('Server is listening on http://localhost:3000 ...'))