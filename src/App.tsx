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
import DashboardProfessor from "./modules/dashboards/pages/DashboardProfessor";
import DisciplinaGrade from "./modules/disciplinaGrade/pages/DisciplinaGradePage";
import Studants from "./modules/studants/pages/Studants";
import ProjectGestao from "./modules/projects/pages/ProjectGestao";
import GradeCurricularPage from "./modules/grade/pages/GradeCurricularPage";
import Professor from "./modules/professor/pages/Professor";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import Header from "./components/Header";
import ProjetosPage from "./modules/projects/pages/Project";
import CadastrarProjetoPage from "./modules/projects/pages/ProjectForm";
import EventList from "./modules/event/pages/EventList";
import EventForm from "./modules/event/pages/EventForm";
import ChatAI from "./modules/assistent/ChatAI";
import ProfilePage from "./modules/auth/pages/ProfilePage";
import TeacherProfilePage from "./modules/professor/ProfessorAluno";
import AddDisciplinaPage from "./modules/disciplinaGrade/pages/AddDisciplinaPage";


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
        {/* ✅ Renderiza as rotas baseadas no perfil */}
        {getRoutesByProfile(profileType).map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
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
    return [
      { path: "/dashboard-estudante", element: <DashboardStudents /> },
      { path: "/grade-curricular", element: <GradeCurricularPage /> },
      { path: "/projetos", element: <ProjetosPage /> },
      { path: "/projetos/cadastrar", element: <CadastrarProjetoPage /> },
      { path: "/eventos", element: <EventList /> },
      { path: "/eventos/cadastrar", element: <EventForm /> },
      { path: "/assistente", element: <ChatAI /> },
      { path: "/perfil", element: <ProfilePage /> },
      { path: "/professores", element: <TeacherProfilePage /> },
    ];
  }

  if (profileType === "professor") {
    return [
      { path: "/dashboard-professor", element: <DashboardProfessor />},
      { path: "/disciplinas-grade", element: <DisciplinaGrade />},
      { path: "/professores-gestao", element: <Professor />} ,
      { path: "/estudantes-gestao", element: <Studants />} , 
      { path: "/projetos-gestao", element: <ProjectGestao />} ,
      { path: "/professor/adicionar-disciplina", element: <AddDisciplinaPage /> },
      { path: "/perfil", element: <ProfilePage />} ,
    ];
  }

  if (profileType === "admin") {
    return (
      <>
        {/* <Route path="/dashboard-admin" element={<DashboardAdmin />} /> */}
      </>
    );
  }

  return [];
};
export default App;
