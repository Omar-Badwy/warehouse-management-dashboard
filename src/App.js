import { Outlet } from 'react-router-dom';
import './App.css';
import SideBar from './components/layout/sidebar';
import AppRoutes from './routes/routes';
import Navbar from './components/layout/navbar';
import { MantineProvider } from '@mantine/core';


function App() {
  return (

    <MantineProvider>

      <div className="app">
        <AppRoutes />

          <div className='sidebar'>
            <SideBar/>
          </div>

          <div className='navbar'>
            <Navbar/>
          </div>

          <div className='main'>
            <Outlet/>
          </div>
          
      </div>
      
    </MantineProvider>
  );
}

export default App;