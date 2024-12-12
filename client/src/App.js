import './App.css';
import SignUp from './components/pages/signUp';
import LogIn from './components/pages/logIn';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([{
  path: '/',
  element: <SignUp />,
},
{
  path: '/logIn',
  element: <LogIn />,
}])


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
