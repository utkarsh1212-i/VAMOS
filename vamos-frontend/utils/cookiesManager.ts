import Cookies from "js-cookie";

const setCookieSession = (accessToken: string, refreshToken: string, refreshExpires: string) => {
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

const getSession = () => {
    const access = Cookies.get('authToken'); // Retrieve the 'authToken' cookie
    const refresh = Cookies.get('refreshToken'); // Retrieve the 'authToken' cookie
  
    if (!access) {
      console.log('No session found');
      return null;
    }
  
    try {
      // Decode and parse the cookie value (URL-safe Base64 encoded string)
      // const parsedTokenDetai
      // ls = JSON.parse(decodeURIComponent(tokenDetails));   for secure
  
      return access;
    } catch (error) {
      console.error('Error parsing token details:', error);
      return null;
    }
  };
  export { getSession , setCookieSession}
  