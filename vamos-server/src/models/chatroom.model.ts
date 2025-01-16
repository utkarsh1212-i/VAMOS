import { DataTypes, Model, Sequelize } from "sequelize";
import envconfig from "../config/env.config";
import { User } from "./user.model";

interface ChatRoomAttributes {
  roomId?: number;
  name: string;
  description?: string;
  createdBy: number;
  teamId: number;
  sportId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  maxParticipants?: number;
  activeMembers?: number;
}

class ChatRoom extends Model<ChatRoomAttributes> implements ChatRoomAttributes {
  public roomId!: number;
  public name!: string;
  public description!: string;
  public createdBy!: number;
  public teamId!: number;
  public sportId!: number;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
  public maxParticipants!: number;
  public activeMembers!: number;    
}

const sequelize = new Sequelize(envconfig.postgres.url, { logging: false });

ChatRoom.init(
  {
    roomId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'room_id',
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: 'name',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description',
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'created_by',
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active',
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'team_id',
      references: {
        model: 'team',
        key: 'team_id',
      },
    },
    sportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'sport_id',
      references: {
        model: 'sport',
        key: 'sport_id',
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
    maxParticipants: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 50,
      field: 'max_participants',
    },
    activeMembers: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'active_memnbers',
    },
  },
  {
    sequelize,
    tableName: 'chatroom',
    timestamps: false,
  }
);

// Define association with User model
ChatRoom.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator'
});

export { ChatRoom, ChatRoomAttributes };
