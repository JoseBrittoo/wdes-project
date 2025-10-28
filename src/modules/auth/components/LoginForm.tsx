import { useState } from "react";
import InputField from "./InputField";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError(false);

    // Validate email and password before submitting
    if (!email || !password) {
      setEmailError(true);
      alert("Preencha o email e a senha.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      const user = data.user;

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("profile")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      const userProfile = profileData?.profile;

      switch (userProfile) {
        case "professor":
          navigate("/dashboard-professor");
          break;
        case "estudante":
          navigate("/dashboard-estudante");
          break;
        case "admin":
          navigate("/dashboard-admin");
          break;
        default:
          alert("Perfil desconhecido.");
      }
    } catch (error: any) {
      console.error("Erro no login:", error.message);
      alert("Falha no login: " + error.message);
      setEmailError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Email Institucional"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="exemplo@instituição.edu.br"
          errorMessage="Email inválido. Use o formato: exemplo@instituição.edu.br"
          isError={emailError}
        />

        <InputField
          label="Senha"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <p className="mt-4 text-center">
        <button
          type="button"
          onClick={handleRegister}
          className="text-blue-500 hover:underline"
        >
          Registre-se
        </button>
      </p>
    </>
  );
}
