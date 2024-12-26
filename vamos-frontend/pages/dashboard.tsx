import React, { useEffect } from "react";
import Logout from "../components/logout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const DashBoard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/signin"); // Redirect to sign-in if not logged in
    }
  }, [session]);

  if (!session) {
    return null; // Avoid rendering the page before redirect
  }
  return (
    <div>
      <h1>Welcome to VAMOS DASHABORAD</h1>
      <Logout />
    </div>
  );
};

export default DashBoard;
