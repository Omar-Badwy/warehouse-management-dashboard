import './App.css';
import SideBar from './components/layout/sidebar';
import AppRoutes from './routes/routes';


function App() {
  return (
    <div className="App">
      <SideBar/>
      <AppRoutes />
    </div>
  );
}

export default App;