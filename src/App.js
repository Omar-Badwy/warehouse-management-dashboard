import { MantineProvider } from '@mantine/core';
import AppRoutes from './routes/routes';
import ModalsProvider from './providers/modalsProvider';
import OrderMOdalProvider from './providers/orderModalProvider';

import '@mantine/core/styles.css';

function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <OrderMOdalProvider>
          <AppRoutes/>
        </OrderMOdalProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;