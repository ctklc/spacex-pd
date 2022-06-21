import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ErrorBoundary from './components/errorBoundary';
import ShipDashboard from './pages/shipDashboard';

function App() {
  return (
    <>
      {/*
        MUI provides an optional CssBaseline component. It fixes some
        inconsistencies across browsers and devices while providing slightly
        more opinionated resets to common HTML elements.
        https://mui.com/material-ui/react-css-baseline/
      */}
      <CssBaseline />
      <ErrorBoundary>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <ShipDashboard />
        </Container>
      </ErrorBoundary>
    </>
  );
}

export default App;
