import logo from './logo.svg';
import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/routes';
import { useContext } from 'react';
import { AuthContext } from './Contexts/AuthProvider';

function App() {
  const{isDarkMode}=useContext(AuthContext)
  return (
    <div className= {isDarkMode ? "dark": "light"}>

      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  );
}

export default App;
