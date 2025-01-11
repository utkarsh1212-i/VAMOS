import Cookies from "js-cookie";

export const setCookieSession = (accessToken: any, refreshToken: any, refreshExpires: any) => {
  Cookies.set('authToken', JSON.stringify({
    token: accessToken,
    expires: refreshExpires
  }));
};

export const getSession = () => {
  const authTokenStr = Cookies.get('authToken');
  if (!authTokenStr) return null;
  console.log(authTokenStr, "authTokenStr")
  try {
    // Remove 'j:' prefix if it exists and parse the JSON
    const cleanToken = authTokenStr.startsWith('j:') 
      ? authTokenStr.slice(2) 
      : authTokenStr;
    
    return JSON.parse(cleanToken);
  } catch (error) {
    console.error('Error parsing auth token:', error);
    return null;
  }
};
