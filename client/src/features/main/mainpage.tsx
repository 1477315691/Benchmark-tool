import React from 'react';
import IconBreadcrumbs from '../../common/IconBreadcrumbs';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { StyledContainer } from '../StyledComponents';


const MainPage: React.FC = () => {
  // 你的组件代码
  return (
    <div>
    <IconBreadcrumbs />
    <StyledContainer maxWidth="xl">
        <Typography variant="h4" gutterBottom>
        Performance Benchmark Tool
      </Typography>
      <Typography variant="h6" gutterBottom>
        How to use it?
      </Typography>
      <Typography paragraph>
        Registration. Go to the <strong>Register</strong> button and create an account with your Microsoft credentials, then proceed to the <strong>Login</strong> page to gain access to the tool.
      </Typography>
      <Typography paragraph>
        - <strong>Run a benchmark</strong>. Go to the <strong>Run test</strong> tab to start running your tests.
        The benchmark is going to return an ID which you can later use in the <strong>History</strong> tab to search for it.
      </Typography>
      <Typography paragraph>
        - <strong>View a test</strong>. Go to the <strong>History</strong> tab to view all of your benchmarks or search by ID.
      </Typography>
      <Typography paragraph>
        - <strong>Schedule a test</strong>. Go to the <strong>Schedule</strong> tab to manage your scheduled benchmarks.
      </Typography>
    </StyledContainer>
    </div>
  )

};

export default MainPage;