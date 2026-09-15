import { MantineProvider } from '@mantine/core';
import AppRoutes from './routes/routes';
import ModalsProvider from './providers/modalsProvider';
import OrderMOdalProvider from './providers/orderModalProvider';
import './styles/global.css'

import '@mantine/core/styles.css';
import ThemeProvider from './providers/themeProvider';

function App() {
  return (
    <ThemeProvider>
      <MantineProvider>
        <ModalsProvider>
          <OrderMOdalProvider>
            <AppRoutes/>
          </OrderMOdalProvider>
        </ModalsProvider>
      </MantineProvider>
    </ThemeProvider>
  );
}

export default App;