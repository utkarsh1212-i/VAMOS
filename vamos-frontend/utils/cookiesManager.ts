import Cookies from "js-cookie";

export const setCookieSession = (accessToken: string, refreshToken: string, refreshExpires: string) => {
    // Combine tokens into a single object for storage
    const tokenDetails = JSON.stringify({
      accessToken,
      refreshToken,
      refreshExpires,
    });
  
    // Set token details in a cookie
    Cookies.set('authToken', tokenDetails, {
      expires: 1,
      secure: true,
      sameSite: 'strict', // Prevents the cookie from being sent with cross-site requests
    });
  };