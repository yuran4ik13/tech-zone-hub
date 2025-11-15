import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
} else if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' });
}

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME!,
  password: String(process.env.DB_PASSWORD!),
  database: process.env.DB_NAME!,
  migrations: ['dist/database/migrations/*.js'],
  migrationsRun: true,
  migrationsTransactionMode: 'all',
  entities: ['dist/**/*.entity.js'],
  logging: true,
  synchronize: false,
};

const datasource = new DataSource(config);

export default datasource;
