import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Entry } from '../entries/entities/entry.entity';

// Load .env for standalone usage (TypeORM CLI, seed script).
config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER ?? 'fug',
  password: process.env.DB_PASSWORD ?? 'fug',
  database: process.env.DB_NAME ?? 'fabula_glossary',
  entities: [Entry],
  migrations: ['dist/database/migrations/*.js'],
  // Dev convenience. Prefer migrations in production.
  synchronize: process.env.DB_SYNC === 'true',
  logging: process.env.DB_LOGGING === 'true',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
