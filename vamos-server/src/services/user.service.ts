import { User } from "../models/user.model";

const getUserByEmail = async (email: string): Promise<any> => {
  const user = await User.findOne({ where: { email } });
  return user;
};


export {getUserByEmail}
