import jwt from 'jsonwebtoken';
import moment from 'moment';
import { Token } from '../models/token.model';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY = process.env.JWT_SECRET || 'somesecret'  


const generateToken = (userId: string, expires: moment.Moment, type: string, secret = SECRET_KEY): string => {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.authToken || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach the payload to the request object
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};



const saveToken = async (token: string, userId: string, expires: moment.Moment, type: string): Promise<Token> => {
    // Convert userId to a number
    const userIdNumber = parseInt(userId);
  
    const tokenDoc = await Token.create({
      tokenValue: token,
      userId: 34,
      expiresIn: expires.toDate() ,
      tokenType: type,
      tokenId: 0,
      createdAt: new Date()
    });
    return tokenDoc;
  };



const generateAuthTokens = async (user: any): Promise<any> => {
    const accessTokenExpires = moment().add(process.env.ACCESSEXPIRATIONTIME, 'minutes');
    const accessToken = generateToken(user.userId, accessTokenExpires,'ACCESS');
  
    const refreshTokenExpires = moment().add(process.env.REFRESHEXPIRATIONDAY, 'days');
    const refreshToken = generateToken(user.ahfUserId, refreshTokenExpires, 'REFRESH');
    await saveToken(refreshToken, user.ahfUserId, refreshTokenExpires, 'REFRESH');
  
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  };


  export {
    generateAuthTokens,
    
  }