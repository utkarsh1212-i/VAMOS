import { Sequelize } from 'sequelize';
import { sequelize } from '../../src/models';

export const resetDatabase = async () => {
  await sequelize.sync({ force: true });
};

export const createMockUser = async () => {
  return {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
  };
};