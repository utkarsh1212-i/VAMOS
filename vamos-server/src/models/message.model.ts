import { DataTypes, Model, Sequelize } from "sequelize";
import envconfig from "../config/env.config";
import { User } from "./user.model";
import { ChatRoom } from "./chatroom.model";

interface MessageAttributes {
  messageId?: number;
  content: string;
  userId: number;
  chatRoomId: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

class Message extends Model<MessageAttributes> implements MessageAttributes {
  public messageId!: number;
  public content!: string;
  public userId!: number;
  public chatRoomId!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public isActive!: boolean;
}

const sequelize = new Sequelize(envconfig.postgres.url, { logging: false });

Message.init(
  {
    messageId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'message_id',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'content',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    chatRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'chatroom_id',
      references: {
        model: 'chatroom',
        key: 'room_id',
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active',
    },
  },
  {
    sequelize,
    tableName: 'message',
    timestamps: false,
  }
);

// Define associations
Message.belongsTo(User, {
  foreignKey: 'userId',
  as: 'sender'
});

Message.belongsTo(ChatRoom, {
  foreignKey: 'chatRoomId',
  as: 'chatRoom'
});

export { Message, MessageAttributes };
