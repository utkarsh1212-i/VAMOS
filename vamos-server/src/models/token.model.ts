import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./user.model";
import envconfig from "../config/env.config";

interface TokenAttributes{
    tokenId : number;
    userId: number;
    tokenType: string;
    tokenValue: string;
    createdAt: Date;
    expiresIn: Date | null
}

class Token extends Model<TokenAttributes> implements TokenAttributes {
    public tokenId!: number;
    public userId!: number;
    public tokenType!: string;
    public tokenValue!: string;
    public createdAt!: Date;
    public expiresIn!: Date | null;
}
const sequelize = new Sequelize(envconfig.postgres.url, { logging: false });

Token.init(
  {
    tokenId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ahf_token_id',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'ahf_user_id',
      },
      field: 'ahf_user_id',
    },
    tokenType: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'token_type',
      validate: {
        isIn: [['REFRESH', "RESET_PASSWORD", "VERIFY_EMAIL"]],
      },
    },
    tokenValue: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    expiresIn: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'expires_at',
    },
  },
  {
    sequelize,
    tableName: 'ahf_token',
    timestamps: false,
  },
);

export { Token}