import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';
import envconfig from "./env.config";
import { User } from "../models/user.model";
import { Token } from "../models/token.model";
import { Sport } from "../models/sports.model";
import { Team } from "../models/team.model";
import { Message } from "../models/message.model";
import { ChatRoom } from "../models/chatroom.model";
import { UserChatRoom } from "../models/userchatroom.model";

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
    await Token.sync({alter : true})
    await Sport.sync({alter : true})
    await Team.sync({alter : true})
    await Message.sync({alter : true})
    await ChatRoom.sync({alter : true})
    // await UserChatRoom.sync({alter : true})
    console.log("User Database connected successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

export default sequelize;
