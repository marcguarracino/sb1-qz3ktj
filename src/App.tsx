import { MantineProvider, createTheme } from '@mantine/core';
import { Calculator } from './components/Calculator';
import '@mantine/core/styles.css';

const theme = createTheme({
  primaryColor: 'blue',
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Calculator />
    </MantineProvider>
  );
}

export default App;