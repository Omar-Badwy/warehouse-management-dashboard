import AppRoutes from './routes/routes';
import { MantineProvider } from '@mantine/core';


function App() {
  return (
      <MantineProvider>
        <AppRoutes/>
      </MantineProvider>
  );
}

export default App;