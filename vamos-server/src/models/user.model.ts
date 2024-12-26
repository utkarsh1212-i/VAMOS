import { DataTypes, Model, Sequelize } from "sequelize";
import envconfig from "../config/env.config";

interface UserAttributes {
  userId: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public userId!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public isActive!: boolean;
}

const sequelize = new Sequelize(envconfig.postgres.url, { logging: false });

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'user_id',
    },
    username: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: 'username',
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      field: 'email',
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password',
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
    tableName: 'user',
    timestamps: false,
  },
);

export { User };
