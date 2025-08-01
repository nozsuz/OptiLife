import { createTheme } from '@mui/material/styles';

// OptiLife 2.0 のブランドカラーを定義
const theme = createTheme({
  palette: {
    primary: {
      main: '#1abc9c', // エメラルドグリーン
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3498db', // ブルー
    },
    background: {
      default: '#f4f7f6',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
        fontWeight: 600,
    }
  },
});

export default theme;
