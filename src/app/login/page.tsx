
import React from 'react'
import { Button, Typography, Box, IconButton, Stack, Tooltip, Alert } from '@mui/material';
import SignIn from '@/components/authButtons/signin';

export default function Page() {
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
            Login
          </Typography>
          <Tooltip title="Need help? Click here!" placement="top" arrow>
            <IconButton aria-label="help">
              {/* <HelpOutlineIcon /> */}
            </IconButton>
          </Tooltip>
        </Box>

        <Stack spacing={2} width="100%">
          <SignIn />
        </Stack>
      </Box>
    </Box>
  )
}

