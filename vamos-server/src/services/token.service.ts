import jwt from 'jsonwebtoken';
import moment from 'moment';
import { Token } from '../models/token.model';
import { Request, Response, NextFunction } from 'express';
import envconfig from '../config/env.config';


const generateToken = (userId: string, expires: moment.Moment, type: string, secret = envconfig.jwt.secret ): string => {
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
    const decoded = jwt.verify(token, envconfig.jwt.secret);
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
      userId: userIdNumber,
      expiresIn: expires.toDate() ,
      tokenType: type,
      createdAt: new Date()
    });
    return tokenDoc;
  };



const generateAuthTokens = async (user: any): Promise<any> => {
    const accessTokenExpires = moment().add(envconfig.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.userId, accessTokenExpires,'ACCESS');
  
    const refreshTokenExpires = moment().add(envconfig.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(user.userId, refreshTokenExpires, 'REFRESH');
    await saveToken(refreshToken, user.userId, refreshTokenExpires, 'REFRESH');
  
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