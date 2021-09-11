import express from 'express';
import configRoutes from './routes';

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configRoutes(app);

export default app;
