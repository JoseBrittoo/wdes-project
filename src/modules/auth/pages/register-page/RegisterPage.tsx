import { supabase } from "../../../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RegisterForm from "../../components/RegisterForm";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSubmit = async (data: any) => {
  setLoading(true);

  try {
    const { data: signUpData, error: signUpError } =
      await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

    if (signUpError) {
      throw signUpError;
    }

    const user = signUpData.user;

    const isTeacher = data.profile === 'professor';

    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: user?.id,
        name: data.name,
        email: data.email,
        matricula: data.matricula,
        course: data.course, 
        course_id: data.courseId.toString(), 
        profile: data.profile,
        is_teacher: isTeacher, 
        is_cotista: data.isCotista,
        cota: data.cota || null,
        is_pcd: data.isPcD,
        deficiencia: data.deficiencia || null,
        lattes_link: null,
        disciplines: null,  
        description: null, 
        created_at: new Date(),
      },
    ]);

    if (profileError) {
      throw profileError;
    }

    alert("Conta criada com sucesso! Verifique seu e-mail para confirmar.");
    navigate("/");
  } catch (error: any) {
    console.error("Erro no registro:", error.message);
    alert("Erro ao registrar: " + error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="register-container min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md fade-in">
        <div className="text-center mb-8">
          <img
            src="./src/assets/logo.png"
            alt="Logo do Sistema"
            className="mx-auto w-24 h-24"
          />
          <h1 className="text-3xl font-bold text-[#032912] mb-2">Criar Conta</h1>
          <p className="text-[#072E13]">
            Preencha os dados para registrar sua conta
          </p>
        </div>

        <RegisterForm onSubmit={handleRegisterSubmit} disabled={loading} />
      </div>
    </div>
  );
}
