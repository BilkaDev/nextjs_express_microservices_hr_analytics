import { createTheme, SxProps, Theme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4b2b'
    }
  }
});

export type Styles = SxProps<Theme>;
