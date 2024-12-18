// src/components/StyledComponents.tsx

import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

export const StyledContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    borderRadius: 8,
    boxShadow: '0px 3px 0px rgba(0, 0, 0, 0.16)',
    marginTop: theme.spacing(2),
    minHeight: 'calc(100vh - 80px)', // Adjust height to fit the header
}));