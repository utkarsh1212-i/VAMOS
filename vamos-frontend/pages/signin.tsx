import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Divider,
  Link,
} from "@mui/material";
// import { getIdentityLoginUrl } from "../url-facades/auth-url";

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/dashboard"); // Redirect to home page if already logged in
    return null;
  }

  const handleSignUpNavigation = () => {
    router.push("/signup");
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" }); // Assuming Google SSO is configured with NextAuth
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Box
          sx={{
            background: "white",
            borderRadius: "16px",
            padding: "32px",
            maxWidth: "400px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: "bold", marginBottom: "8px" }}
          >
            Welcome To The Arena
          </Typography>

          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            sx={{ marginBottom: "16px" }}
          />
          <Typography
            variant="body2"
            align="right"
            sx={{ marginBottom: "16px", cursor: "pointer", color: "#4CAF50" }}
          >
            Forgot Password?
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#4CAF50",
              color: "white",
              marginBottom: "16px",
              "&:hover": { backgroundColor: "#45A049" },
            }}
          >
            Login
          </Button>

          <Divider sx={{ marginY: "16px" }}>or</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={
              <img
                src="/google-icon.png"
                alt="Google Icon"
                style={{ height: 24 }}
              />
            }
            onClick={handleGoogleSignIn}
            // href={getIdentityLoginUrl('google')}     // later to be done via passport
            sx={{
              marginBottom: "16px",
              borderColor: "#4285F4",
              color: "#4285F4",
            }}
          >
            Google
          </Button>

          <Typography align="center" sx={{ marginBottom: "8px" }}>
            Don’t have an account?{" "}
            <Link
              onClick={handleSignUpNavigation}
              sx={{ cursor: "pointer", color: "#4CAF50", textDecoration: 'none' }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
