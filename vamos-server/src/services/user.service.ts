import { User } from "../models/user.model";

const getUserByEmail = async (email: string): Promise<any> => {
  const user = await User.findOne({ where: { email } });
console.log('user data: ', user)
  return user;
};
const getUserById = async (userId: number): Promise<any> => {
  const user = await User.findOne({ where: { userId } });
console.log('user data: ', user)
  return user;
};


export {getUserByEmail, getUserById}
