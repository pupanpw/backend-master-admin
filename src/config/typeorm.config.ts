import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const typeOrmModuleOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  port: parseInt(process.env.MYSQL_PORT),
  database: process.env.MYSQL_DATABASE, // Add the 'database' property for MySQL
  entities: [__dirname + '/../**/*.entity.js'], // Change file extension to '*.entity.js'
  synchronize: false,
};

export const OrmConfig = {
  ...typeOrmModuleOptions,
  migrationsTableName: 'MIGRATIONS',
  entities: [__dirname + '/../**/*.entity.js'], // Change file extension to '*.entity.js'
  migrations: [
    'src/database/migrations/*.js', // Change file extension to '*.js'
    `src/database/seeders/${process.env.NODE_ENV}/*.js`, // Change file extension to '*.js'
  ],
};

export default new DataSource(OrmConfig);
