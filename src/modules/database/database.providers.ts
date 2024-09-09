import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

/* nest-configuration module is not loading in here yet when used by cli , 
 not idial but only for typeorm data source use this hack
 */
import * as dotenv from 'dotenv';
dotenv.config();

export const databaseConfig: DataSourceOptions = {
  // @ts-ignore
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  synchronize: false,
  migrations: [
    join(__dirname, 'migrations', '*.migrations.{ts,js}'),
    join(__dirname, '..', 'migrations', '*.migrations.{ts,js}'),
    join(__dirname, '..', '**', 'migrations', '*.{ts,js}'),
  ],
  migrationsTableName: '0migration_table',
};

export const dataSource = new DataSource(databaseConfig);
