import React, { useEffect } from "react";
import Logout from "../components/logout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import apiClient from "../utils/apiManager";
import { apiUrls } from "../utils/apiUrls";
import { getSession, setCookieSession } from "../utils/cookiesManager";
import axios from "axios";

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
    try {
      const tokenDetails = getSession();
      if (!tokenDetails) {
        console.log("tokenDetailsinDashboard", tokenDetails)
        router.push('/signin');
        return;
      }
      
      console.log("tokenDetailsinDashboard", tokenDetails)
      const currentTimestamp = new Date().getTime();
      const expiresTimestamp = new Date(tokenDetails?.expires).getTime();

      if (currentTimestamp < expiresTimestamp) {
        const refreshToken = Cookies.get('refreshToken')
        // api call to get access token using refresh token
        const response = await apiClient.post(apiUrls.GET_ACCESS_TOKEN, {
          refreshToken,
        });

        if (response.status === 200) {
          const { access, refresh } = response.data;
          setCookieSession(
            access.token,
            refresh.token,
            refresh.expires
          );
        }
      } else {
        // Token is expired
        Cookies.remove('authToken');
        console.log("inside else")
        sessionStorage.clear();
        router.push('/signin');
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
      // On error, clear cookies and redirect to login
      Cookies.remove('authToken');
      sessionStorage.clear();
      router.push('/signin');
    }
  };

  useEffect(() => {
    // refreshAccessToken();
    const intervalId = setInterval(() => {
      refreshAccessToken();
    }, 30 * 60 * 1000);   // 30 minutes

    // Cleanup the previous interval when the component unmounts or when the effect is re-executed
    return () => {
      clearInterval(intervalId);
    };
  }, [session]);


  return (
    <div>
      <h1>Welcome to VAMOS DASHABORAD</h1>

      <Logout />
    </div>
  );
};

export default DashBoard;
