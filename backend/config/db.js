import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'purohitapp',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
      underscored: false,
    },
  }
);

const connectDB = async () => {
  const host = sequelize.config.host;
  const maxRetries = 5;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await sequelize.authenticate();
      console.log(`MySQL Connected: ${host}/${sequelize.config.database}`);

      // Sync all models — creates tables if they don't exist
      await sequelize.sync({ alter: true });
      console.log('Database tables synced');
      return;
    } catch (error) {
      console.error(`MySQL Connection Error (attempt ${attempt}/${maxRetries}): ${error.message}`);
      console.error(`  Resolved config -> host: ${host}, port: ${sequelize.config.port}, database: ${sequelize.config.database}, user: ${sequelize.config.username}`);
      if (attempt === maxRetries) process.exit(1);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

export { sequelize };
export default connectDB;
