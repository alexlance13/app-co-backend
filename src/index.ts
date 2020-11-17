import 'reflect-metadata';
import 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import { createConnection } from 'typeorm';
import cors from 'cors';
import { insertDataFromTheFiles } from './helpers';
import controllers from './controllers';
import middlewares from './middlewares';
import { ITables } from './types';

const app = express();
const tables: ITables = { user: 'users', user_statistic: 'users_statistic' };

app.use(express.json());

app.use(
  cors({
    'Access-Control-Allow-Origin': '*',
  }),
);

app.get('/users', [middlewares.validationCheck, controllers.getUsersWithStatistic]);

app.get('/user/:id', [middlewares.validationCheck, controllers.getStatisticByUserId]);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

app.use(middlewares.errorHandler);

(async (): Promise<void> => {
  const connection = await createConnection();
  const res = await connection.query("SELECT name FROM sqlite_master WHERE type='table'");
  const existedTables = res.map(({ name }) => name);
  Object.keys(tables).forEach((tableName) => {
    if (existedTables.includes(tableName)) delete tables[tableName];
  });
  await connection.synchronize(); // creating missing tables
  await insertDataFromTheFiles(tables);
  console.log('DB connected');
  app.listen({ port: process.env.PORT || 3000 }, () => console.log(`Web Server is running on port ${process.env.PORT || 3000}...`));
})();
