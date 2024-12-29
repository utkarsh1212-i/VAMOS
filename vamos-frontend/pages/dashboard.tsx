import React, { useEffect } from "react";
import Logout from "../components/logout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import apiClient from "../utils/apiManager";
import { apiUrls } from "../utils/apiUrls";
import { getSession, setCookieSession } from "../utils/cookiesManager";

const DashBoard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      const isSession = getSession()
      console.log(isSession, "isSession")
      if(!isSession){
        console.log(session ,"SESSION", isSession)
        router.push("/signin");
      }
    }
  }, [session]);

  // Function to refresh access token every 1 minute
  const refreshAccessToken = async () => {
    const tokenDetails = JSON.parse(Cookies.get('authToken') || '{}');
    const refreshToken = tokenDetails?.refreshToken;
    const refreshExpires = tokenDetails?.refreshExpires;
    if (refreshToken && refreshExpires) {
      try {
        // Check if refresh token is expired
        const currentTimestamp = new Date().getTime();
        const expiresTimestamp = new Date(refreshExpires).getTime();
        if (currentTimestamp < expiresTimestamp) {
          const response = await apiClient.post(`${apiUrls.GET_ACCESS_TOKEN}`, {
            refreshToken,
          });
          if (response.status === 200) {
             const accessToken = response.data.access.token;
          const newRefreshToken = response.data.refresh.token; // Update if backend sends a new refresh token
          const newRefreshExpires = response.data.refresh.expires;
            setCookieSession(accessToken, refreshToken, refreshExpires);  // to be used as a function to set new tokens in Cookies
          }
        } else {
          Cookies.remove('authToken');
          sessionStorage.clear();
          router.push('/signin')
        }
      } catch (error) {
        console.error("Error refreshing access token:", error);
      }
    } else {
      console.error(
        "Refresh token or expiration time not found in localStorage"
      );
    }
  };

  useEffect(() => {
    refreshAccessToken();
    const intervalId = setInterval(() => {
      refreshAccessToken();
    }, 30 * 60 * 1000);   // 30 minutes

    // Cleanup the previous interval when the component unmounts or when the effect is re-executed
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  return (
    <div>
      <h1>Welcome to VAMOS DASHABORAD</h1>

      {/* <Logout /> */}
    </div>
  );
};

export default DashBoard;
