import { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface Props {
  errorNumber: number;
  text: string;
  image: string;
  children: ReactNode;
}

export const ErrorPage: FC<Props> = ({ errorNumber, text, image, children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={6} margin="auto" textAlign="center">
            <Typography variant="h1">{errorNumber}</Typography>

            <Typography variant="h6">{text}</Typography>

            {children}
          </Grid>
          <Grid item xs={12} sm={8} md={6} margin="auto">
            <div style={{ maxWidth: 500, maxHeight: 250 }}>
              <img src={image} alt={`${errorNumber} error`} style={{ width: '100%' }} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
