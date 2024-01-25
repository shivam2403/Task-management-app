import Home from "./pages/home/Home";
import Tasks from "./pages/tasks/Tasks";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingleTask from "./pages/singleTask/SingleTask";
import { UserProvider } from "./context/UserContext";

const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/tasks',
    element:<Tasks/>
  },
  {
    path:'/task/:id',
    element:<SingleTask/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
])

function App() {
  return (
    <div className="App">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  );
}

export default App;
