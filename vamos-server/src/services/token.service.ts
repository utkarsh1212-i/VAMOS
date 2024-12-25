import jwt from 'jsonwebtoken';
import moment from 'moment';


const generateToken = (userId: string, expires: moment.Moment, type: string, secret = config.jwt.secret): string => {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
};



const saveToken = async (token: string, userId: string, expires: moment.Moment, type: string): Promise<Token> => {
    // Convert userId to a number
    const userIdNumber = parseInt(userId);
  
    const tokenDoc = await Token.create({
      value: token,
      ahfUserId: userIdNumber,
      expiresAt: expires.toDate(),
      tokenType: type,
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