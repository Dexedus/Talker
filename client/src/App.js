import './App.css';
import Home from './components/pages/home';
import SignUp from './components/pages/signUp';
import LogIn from './components/pages/logIn';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([{
  path: '/signup',
  element: <SignUp />,
},
{
  path: '/login',
  element: <LogIn />,
},
{
  path: '/',
  element: <Home />,
}])


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
