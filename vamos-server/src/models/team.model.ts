import { DataTypes, Model, Sequelize } from "sequelize";
import envconfig from "../config/env.config";
import { User } from "./user.model";
import { Sport } from "./sports.model";

interface TeamAttributes {
  teamId?: number;
  name: string;
  description?: string;
  sportId: number;
  imageUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

class Team extends Model<TeamAttributes> implements TeamAttributes {
  public teamId!: number;
  public name!: string;
  public description!: string;
  public sportId!: number;
  public imageUrl!: string;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

const sequelize = new Sequelize(envconfig.postgres.url, { logging: false });

Team.init(
  {
    teamId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'team_id',
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
    sportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'sport_id',
      references: {
        model: 'sport',
        key: 'sport_id',
      },
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
    tableName: 'team',
    timestamps: false,
  }
);

// Define associations
Team.belongsTo(Sport, {
  foreignKey: 'sportId',
  as: 'sport'
});

Team.belongsTo(User, {
  foreignKey: 'captainId',
  as: 'captain'
});


export { Team };
