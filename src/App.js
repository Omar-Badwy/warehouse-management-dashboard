import { MantineProvider } from '@mantine/core';
import AppRoutes from './routes/routes';
import ModalsProvider from './providers/modalsProvider';


function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <AppRoutes/>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;