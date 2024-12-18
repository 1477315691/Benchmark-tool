import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import SettingsIcon from '@mui/icons-material/Settings';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
  }));

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//   event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function IconBreadcrumbs() {
  const location = useLocation();

    // 使用 location.pathname 来确定当前页面
  const isActivePage = (path:string) => location.pathname === path;
  return (
    <div role="presentation" onClick={handleClick}>
    <StyledContainer maxWidth = "xl">
      <Breadcrumbs aria-label="breadcrumb">
        <Link 
          component={RouterLink}
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color={isActivePage('/main') ? 'text.primary' : 'inherit'}
          to="/main"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          MUI
        </Link>
        <Link
          underline="hover"
          component={RouterLink}
          sx={{ display: 'flex', alignItems: 'center' }}
          color={isActivePage('/run') ? 'text.primary' : 'inherit'}
          to="/run"
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Run Benchmark
        </Link>
        <Link
            underline="hover"
            component={RouterLink}
            sx={{ display: 'flex', alignItems: 'center' }}
            color={isActivePage('/statistics') ? 'text.primary' : 'inherit'}
            to="/statistics"
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Statistics
        </Link>
      </Breadcrumbs>
    </StyledContainer>
  </div>
  );
}