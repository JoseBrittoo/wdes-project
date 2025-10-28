import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import LoginPage from "./modules/auth/pages/login-page/LoginPage";
import RegisterPage from "./modules/auth/pages/register-page/RegisterPage";
import DashboardStudents from "./modules/dashboards/pages/DashboardStudants";
import GradeCurricularPage from "./modules/grade/pages/GradeCurricularPage";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import Header from "./components/Header";
import ProjetosPage from "./modules/projects/pages/Project";
import CadastrarProjetoPage from "./modules/projects/pages/ProjectForm";

function AppContent() {
  const [profileType, setProfileType] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("name, profile")
          .eq("id", user.id)
          .single();

        if (!error && profileData) {
          setProfileType(profileData.profile);
        }
      }
    };
    fetchUserData();
  }, []);

  const shouldShowHeader =
    profileType &&
    location.pathname !== "/" &&
    location.pathname !== "/register";

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            profileType ? (
              <Navigate to={`/dashboard-${profileType}`} replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {getRoutesByProfile(profileType)}
      </Routes>
      <ToastContainer
        theme="light"
        toastClassName="relative flex p-0 min-h-10 rounded-md overflow-hidden cursor-pointer"
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

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

const getRoutesByProfile = (profileType: string | null) => {
  if (profileType === "estudante") {
    return (
      <>
        <Route path="/dashboard-estudante" element={<DashboardStudents />} />
        <Route path="/grade-curricular" element={<GradeCurricularPage />} />
        <Route path="/projetos" element={<ProjetosPage />} />
        <Route path="/projetos/cadastrar" element={<CadastrarProjetoPage />} />
      </>
    );
  }

  if (profileType === "professor") {
    return (
      <>
        {/* <Route path="/dashboard-professor" element={<DashboardProfessors />} /> */}
      </>
    );
  }

  if (profileType === "admin") {
    return (
      <>
        {/* <Route path="/dashboard-admin" element={<DashboardAdmin />} /> */}
      </>
    );
  }

  return null;
};

export default App;
