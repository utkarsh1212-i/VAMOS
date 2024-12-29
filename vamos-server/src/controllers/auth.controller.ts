import * as tokenService from '../services/token.service';
import * as userService from '../services/user.service';
import httpStatus from 'http-status'
import ApiError from '../utils/ApiError';
import { User } from '../models/user.model';

// const signUp = async(req : any, res : any) => {
//   res.status(200).json({ message : "Running"})
// }
const signUp = async (req: any, res: any) => {
  try {
    // Check if request body is empty
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Bad request. Request body is empty",
      });
    }

    // Check if required fields are missing in the request body
    let { fullName, email, password } = req.body;
    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, and password are required",
      });
    }

    // Check password requirements
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(req.body.password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, one capital letter, and one special character",
      });
    }

    // Create the user
    const user = await User.create({
      username: fullName,           // Replace with the actual username
      email,  // Replace with the actual email
      password,  // Replace with the actual hashed password
      createdAt: new Date(),          // Current timestamp, optional since defaultValue is set
      updatedAt: new Date(),          // Current timestamp, optional since defaultValue is set
      isActive: true,

    });
    // const user = await userService.createUser(req.body);

    // Generate a verify email token and send it to the user
    //   const verifyEmailToken = await tokenService.generateVerifyEmailToken(user.dataValues);
    //   await emailService.sendVerificationEmail(user.dataValues, verifyEmailToken, randomPassword);

    // Send success response with status code 201
    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "User registered successfully",
      userData: user
    });
  } catch (error: any) {
    if (error instanceof ApiError && error.statusCode === httpStatus.CONFLICT) {
      // Handle conflict error if the email is already registered
      return res.status(httpStatus.CONFLICT).json({
        success: false,
        message:
          "Email already registered. Please use a different one to sign up",
      });
    }
    // Handle other errors
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "An error occurred while processing your request",
      error: error.message,
    });
  }
};



//********* LOGIN ***************** */
// Standard Sign In
const login = async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Email or Password is incorrect',
        });
      }
      // check if user exists or not 
      const user = await userService.getUserByEmail(email);
      if (user == null) {
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Account does not exist',
        });
      }
      const { password: _, ...userWithoutPassword } = user.dataValues; // Exclude password property
      const tokens = await tokenService.generateAuthTokens(user.dataValues);
      // await setLocalStore(email);
      res.cookie('authToken', tokens?.access?.token, {
        // httpOnly: true, // for production only 
        secure: process.env.NODE_ENV === 'production',
        // secure: true,
        sameSite: 'strict',
        maxAge: 3600000, // 1 hour
      });
      res.cookie('refreshToken', tokens?.access?.refresh, {
        // httpOnly: true, // for production only 
        secure: process.env.NODE_ENV === 'production',
        // secure: true,
        sameSite: 'strict',
        maxAge: 3600000, // 1 hour
      });
      res.status(200).json({ success: true, message: 'Sign-in successful', tokens });
    } catch (error: any) {
      console.error(error); // Log the error
    //    
    }
};



// ********** Log Out  ************* 

// const logout = async (req: Request, res: Response) => {
//   const result = await authService.logout(req.body.refreshToken);
//   if (result === "successful") {
//     res.cookie("connect.sid", "", { expires: new Date(0) });
//     res
//       .status(httpStatus.OK)
//       .json({ success: true, message: "Logout Successfully" });
//   } else {
//     res
//       .status(httpStatus.NOT_FOUND)
//       .json({ success: false, message: "Refresh Token not found" });
//   }
// };

export { login , signUp}
