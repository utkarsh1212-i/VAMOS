import React from 'react';
import { Button, Typography, Box, IconButton, Stack, Tooltip } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const LoginPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f0f2f5"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        bgcolor="#fff"
        p={4}
        borderRadius={3}
        boxShadow={4}
        width="320px"
      >
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          width="100%" 
          mb={3}
        >
          <Typography variant="h6" align="center" flexGrow={1} fontWeight="500">
            Login Page
          </Typography>
          <Tooltip title="Need help? Click here!" placement='top' arrow>
            <IconButton aria-label="help">
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Stack spacing={2} width="100%">
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            fullWidth
            size="large"
            sx={{
              borderRadius: 5,
              textTransform: 'none',
              justifyContent: 'flex-start',
              padding: '12px 20px',
              color: '#000',
              borderColor: '#ddd',
              transition: 'background-color 0.3s, border-color 0.3s',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                borderColor: '#ccc',
              },
            }}
          >
            Login with Google
          </Button>
          <Button
            variant="outlined"
            startIcon={<FacebookIcon />}
            fullWidth
            size="large"
            sx={{
              borderRadius: 5,
              textTransform: 'none',
              justifyContent: 'flex-start',
              padding: '12px 20px',
              color: '#000',
              borderColor: '#ddd',
              transition: 'background-color 0.3s, border-color 0.3s',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                borderColor: '#ccc',
              },
            }}
          >
            Login with Facebook
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginPage;
