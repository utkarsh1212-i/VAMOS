import { DataTypes, Model, Sequelize } from "sequelize";
import envconfig from "../config/env.config";
import { User } from "./user.model";
import { ChatRoom } from "./chatroom.model";

interface UserChatRoomAttributes {
  id?: number;
  userId: number;
  chatRoomId: number;
  joinedAt: Date;
  leftAt?: Date;
  isActive: boolean;
}

class UserChatRoom extends Model<UserChatRoomAttributes> implements UserChatRoomAttributes {
  public id!: number;
  public userId!: number;
  public chatRoomId!: number;
  public joinedAt!: Date;
  public leftAt!: Date;
  public isActive!: boolean;
}

const sequelize = new Sequelize(envconfig.postgres.url, { logging: false });

UserChatRoom.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
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
    joinedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'joined_at',
    },
    leftAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'left_at',
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
    tableName: 'user_chatroom',
    timestamps: false,
  }
);

// Define associations
UserChatRoom.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

UserChatRoom.belongsTo(ChatRoom, {
  foreignKey: 'chatRoomId',
  as: 'chatRoom'
});

export { UserChatRoom };
