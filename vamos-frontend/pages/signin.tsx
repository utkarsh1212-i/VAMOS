import React, { useState } from "react";
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
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import Cookies from 'js-cookie';
import {apiUrls} from '../utils/apiUrls'
import apiClient from "../utils/apiManager";

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 


  if (session) {
    router.push("/dashboard");
    return null;
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError("");
      setIsLoading(true);
      console.log(formData, "formData")

      // Call the login API
      // const response = await apiClient.post(`${apiUrls.LOGIN}`, { formData})
      const response = await axios.post('http://localhost:8085/api/v1/auth/signin', formData, {  withCredentials: true });
      console.log(response, "LOGIN RESPONSE")

        if (response.status == 200) {
            const { tokens } = await response.data;
            //   await getUserProfile()
            router.push("/dashboard");
        }
        setIsLoading(false);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to login. Please try again."
      );
      setIsLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            sx={{ marginBottom: "16px" }}
            value={formData.email}
            onChange={handleChange}
            />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            variant="outlined"
            sx={{ marginBottom: "16px" }}
            value={formData.password}
            onChange={handleChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordToggle} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
            }}
            />
           {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ marginBottom: "16px" }}
              >
                {error}
              </Typography>
            )}
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
            type="submit"
            disabled={loading}
            sx={{
              backgroundColor: "#4CAF50",
              color: "white",
              marginBottom: "16px",
              "&:hover": { backgroundColor: "#45A049" },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
          </form>

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
