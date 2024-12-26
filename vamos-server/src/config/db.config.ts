import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';
import envconfig from "./env.config";
import { User } from "../models/user.model";

// Load environment variables
dotenv.config();

const sequelize = new Sequelize(
  envconfig.postgres.url, {logging : false}
);

export const connectDB = async () => {
  try {
    console.log(`Database connection start on ${envconfig.postgres.url}!`);
    await sequelize.authenticate();
    await User.sync({alter : true})
    console.log("User Database connected successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

export default sequelize;
