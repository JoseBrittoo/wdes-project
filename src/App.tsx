import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

//pages imports
import LoginPage from "./modules/auth/pages/login-page/LoginPage";
import RegisterPage from "./modules/auth/pages/register-page/RegisterPage";
import DashboardStudents from "./modules/dashboard-studants/pages/Dashboard";
//

const routes = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard-students",
    element: <DashboardStudents />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        theme="light"
        toastClassName={
          "relative flex p-0 min-h-10 rounded-md overflow-hidden cursor-pointer"
        }
        position="top-right"
        autoClose={5000}
        transition={Bounce}
        pauseOnHover={false}
        closeOnClick
        hideProgressBar
        newestOnTop
      />
    </>
  );
}

export default App;
