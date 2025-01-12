import { DataTypes, Model, Sequelize } from "sequelize";
import envconfig from "../config/env.config";

interface SportAttributes {
  sportId?: number;
  name: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

class Sport extends Model<SportAttributes> implements SportAttributes {
  public sportId!: number;
  public name!: string;
  public description!: string;
  public imageUrl!: string;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

const sequelize = new Sequelize(envconfig.postgres.url, { logging: false });

Sport.init(
  {
    sportId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'sport_id',
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'name',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'description',
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'image_url',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active',
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
  },
  {
    sequelize,
    tableName: 'sport',
    timestamps: false,
  }
);

export { Sport };
