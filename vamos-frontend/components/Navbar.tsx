import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
  Avatar,
  styled,
  Tooltip,
} from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Logout from './logout';
import Image from 'next/image';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  // backgroundColor: 'rgba(33, 147, 176, 0.95)',
  backgroundColor: 'rgba(33, 147, 176, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

const NavLinks = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: theme.spacing(4),
  gap: theme.spacing(2),
}));

const StyledNavLink = styled(Button)(({ theme }) => ({
  color: '#ffffff',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  '&.active': {
    color: '#ffffff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
}));

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path: string) => router.pathname === path;

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        {/* Logo */}
        <LogoContainer onClick={() => router.push('/dashboard')}>
          <Image 
            src="/vamos-high-resolution-logo-transparent.svg"
            alt="Vamos Logo" 
            width={100}
            height={40}
            style={{ marginRight: 8 }}
          />
          {/* <Typography
            variant="h6"
            component="div"
            sx={{ 
              color: '#ffffff',
              fontWeight: 'bold'
            }}
          >
            VAMOS
          </Typography> */}
        </LogoContainer>

        {/* Navigation Links */}
        <NavLinks>
          <Link href="/team" passHref>
            <StyledNavLink
              className={isActive('/team') ? 'active' : ''}
            >
              My Team 
            </StyledNavLink>
          </Link>
          <Link href="/quizzes" passHref>
            <StyledNavLink
              className={isActive('/quizzes') ? 'active' : ''}
            >
              Quizzes
            </StyledNavLink>
          </Link>
        </NavLinks>

        {/* Profile Menu */}
        <Box>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleProfileClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                {session?.user?.name?.[0] || 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => router.push('/profile')}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem>
            <Logout />
          </MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar; 