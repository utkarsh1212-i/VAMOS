import React, { useEffect } from "react";
import { Container, Grid, Box, Typography, IconButton } from '@mui/material';
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import { QuizOutlined, GroupOutlined, ChatOutlined, AssignmentOutlined } from '@mui/icons-material';
import Logout from "../components/logout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import apiClient from "../utils/apiManager";
import { apiUrls } from "../utils/apiUrls";
import { getSession, setCookieSession } from "../utils/cookiesManager";
import axios from "axios";
import styled from "@emotion/styled";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const ContentSection = styled(Box)(({ theme }) => ({
  padding: '2rem',
  background: 'linear-gradient(to right, rgb(15, 12, 41), rgb(48, 43, 99), rgb(36, 36, 62))',
  marginTop: '4rem',
  boxShadow: 'inset 0 0 100px rgba(0,0,0,0.3)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))',
    pointerEvents: 'none'
  }
}));

const SportsCard = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '280px',
  height: '400px',
  borderRadius: '16px',
  overflow: 'hidden',
  marginRight: '24px',
  transition: 'all 0.5s ease',
  cursor: 'pointer',
  transform: 'perspective(100rem) rotateY(0deg)',
  boxShadow: '0 1px 0.5rem rgba(57,255,20,0.9)',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',

  '&:hover': {
    transform: 'perspective(1000px) rotateY(-10deg) translateY(-5px)',
    width: '40rem',
    boxShadow: '20px 20px 50px rgba(0,0,0,0.3)',
    transition: 'all 0.8s ease',
  },

  '& .content-info': {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    padding: '20px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
    color: '#fff',
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'all 0.4s ease',
  },

  '&:hover .content-info': {
    opacity: 1,
    transform: 'translateY(0)',
  },

  '& img': {
    transition: 'all 0.5s ease',
  },

  '&:hover img': {
    transform: 'scale(1.1)',
  }
}));

const ContentImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const ContentInfo = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '20px',
  background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
  color: 'white',
  opacity: 0,
  transition: 'opacity 0.3s',
  className: 'content-info',
});

const DashBoard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      const isSession = getSession()
      console.log(isSession, "isSession")
      if (!isSession) {
        console.log(session, "SESSION", isSession)
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
      console.log("hitting refresh access token")
    }, 15 * 60 * 1000);   // 15 minutes

    // Cleanup the previous interval when the component unmounts or when the effect is re-executed
    return () => {
      clearInterval(intervalId);
    };
  }, [session]);

  const sportItems = [
    {
      id: 1,
      title: "Cricket",
      slug: "cricket",
      description: "A thrilling story of racing and redemption",
      image: "/cricket.jpg"
    },
    {
      id: 2,
      title: "Football",
      slug: "football",
      description: "Holiday adventure with action and comedy",
      image: "/football.webp"
    },
    {
      id: 3,
      title: "Basketball",
      slug: "basketball",
      description: "Holiday adventure with action and comedy",
      image: "/basketball.jpg"
    },
    {
      id: 4,
      title: "Rugby",
      slug: "rugby",
      description: "Holiday adventure with action and comedy",
      image: "/rugby.jpg"
    },
    {
      id: 5,
      title: "Triathlon",
      slug: "triathlon",
      description: "Holiday adventure with action and comedy",
      image: "/ironman.jpg"
    },
    // Add more items as needed
  ];
  const teamItems = [
    {
      id: 1,
      title: "Manchester United",
      slug: "manchester-united",
      description: "A thrilling story of racing and redemption",
      image: "/unitedteam.jpg"
    },
    {
      id: 2,
      title: "Real Madrid",
      slug: "real-madrid",
      description: "Holiday adventure with action and comedy",
      image: "/realmadrid.jpeg"
    },
    {
      id: 3,
      title: "Kerala Blasters",
      slug: "kerala-blasters",
      description: "Holiday adventure with action and comedy",
      image: "/keralablasters2.webp"
    },
    {
      id: 5,
      title: "Mumbai Indians",
      slug: "mumbai-indians",
      description: "Holiday adventure with action and comedy",
      image: "/mumbaiindians.jpg"
    },
    // Add more items as needed
  ];

  return (
    // <div style={{background:'linear-gradient(to right, #000000, #434343)'}}>
    <div>
      <Navbar />
      {/* Container for the dashboard cards */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} className="head-container">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Take Quiz"
              description="Start a new quiz or continue where you left off"
              icon={<QuizOutlined color="primary" />}
              onClick={() => router.push('/quizzes')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="My Team"
              description="View and manage your team members"
              icon={<GroupOutlined color="primary" />}
              onClick={() => router.push('/team')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Chat"
              description="Connect with your team members"
              icon={<ChatOutlined color="primary" />}
              onClick={() => router.push('/chat')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard
              title="Reports"
              description="View your performance and analytics"
              icon={<AssignmentOutlined color="primary" />}
              onClick={() => router.push('/reports')}
            />
          </Grid>
        </Grid>
      </Container>

      {/* New content section for SPORTS */}
      <ContentSection>
        <Container maxWidth="xl">
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{
              fontWeight: 'bold',
              color: '#ffffff',
              fontSize: '2rem',
              fontFamily: '"Poppins", sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textAlign: 'center',
              textShadow: '0 0 10px rgba(57,255,20,0.5)'
            }}>
              Featured Sports
            </Typography>
            <Box>
              <IconButton>
                <ChevronLeft />
              </IconButton>
              <IconButton>
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{
            display: 'flex',
            overflowX: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            pb: 2,
            width: '100%'
          }}>
            {/* {sportItems.map((item) => (
              <SportsCard key={item.id}>
                <ContentImage src={item.image} alt={item.title} />
                <ContentInfo>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2">
                    {item.description}
                  </Typography>
                </ContentInfo>
              </SportsCard>
            ))} */}
            {sportItems.map((item) => (
              <SportsCard key={item.id} onClick={() => router.push(`/sports/${item.slug}`)}>
                <ContentImage
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <Box className="content-info">
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      textAlign: 'center',
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: '#39ff14',
                      fontFamily: '"Poppins", sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      textShadow: '0 0 8px rgba(57,255,20,0.7)',
                      padding: '0.5rem'
                    }}
                  >
                    {item.title}
                  </Typography>
                  {/* <Typography variant="body2">
                    {item.description}
                  </Typography> */}
                </Box>
              </SportsCard>
            ))}

          </Box>

        </Container>
      </ContentSection>


      {/* New content section for TEAMS */}
      <ContentSection>
        <Typography variant="h5" sx={{
          fontWeight: 'bold',
          color: '#ffffff',
          fontSize: '2rem',
          fontFamily: '"Poppins", sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          textAlign: 'center',
          textShadow: '0 0 10px rgba(57,255,20,0.5)'
        }}>
          Featured Teams
        </Typography>

        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Box sx={{
            display: 'flex',
            overflowX: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            pb: 2,
            width: '100%'
          }}>
            {teamItems.map((item) => (
              <SportsCard key={item.id} onClick={() => router.push(`/teams/${item.slug}`)}>
                <ContentImage
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <Box className="content-info">
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      textAlign: 'center',
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: '#39ff14',
                      fontFamily: '"Poppins", sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      textShadow: '0 0 8px rgba(57,255,20,0.7)',
                      padding: '0.5rem'
                    }}
                  >
                    {item.title}
                  </Typography>
                  {/* <Typography variant="body2">
                    {item.description}
                  </Typography> */}
                </Box>
              </SportsCard>
            ))}

          </Box>

        </Container>
      </ContentSection>

    </div>
  );
};

export default DashBoard;
