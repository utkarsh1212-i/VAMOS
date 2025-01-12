import { Box, Paper, Typography, styled } from '@mui/material';
import React from 'react';

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.18)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
  }
}));

interface DashboardCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const DashboardCard = ({ title, description, icon, onClick }: DashboardCardProps) => {
  return (
    <StyledCard onClick={onClick}>
      {icon && <Box sx={{ mb: 2, fontSize: '2.5rem' }}>{icon}</Box>}
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {description}
      </Typography>
    </StyledCard>
  );
};

export default DashboardCard; 