import { Sequelize } from 'sequelize';
import config from '../../config/config.json';

const env = process.env.NODE_ENV || 'development';
const dbConfig = JSON.parse(JSON.stringify(config))[env];

const sequelize = new Sequelize({
  ...dbConfig
});

sequelize.sync({ force: env === 'development' })  // Use force sync only in development
  .then(() => console.log('Database & tables created!'));

export default sequelize;
