import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Entry } from '../entries/entities/entry.entity';

// Load .env for standalone usage (TypeORM CLI, seed script).
config();

// A single connection string (e.g. Neon) takes precedence over the DB_* parts.
// Hosted Postgres requires TLS, so SSL is switched on whenever it is used.
const connection: Partial<PostgresConnectionOptions> = process.env.DATABASE_URL
  ? { url: process.env.DATABASE_URL, ssl: true }
  : {
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER ?? 'fug',
      password: process.env.DB_PASSWORD ?? 'fug',
      database: process.env.DB_NAME ?? 'fabula_glossary',
    };

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  ...connection,
  entities: [Entry],
  migrations: ['dist/database/migrations/*.js'],
  // Dev convenience. Prefer migrations in production.
  synchronize: process.env.DB_SYNC === 'true',
  logging: process.env.DB_LOGGING === 'true',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
