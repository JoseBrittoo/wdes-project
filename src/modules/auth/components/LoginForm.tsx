import { useState } from "react";
import InputField from "./InputField";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validação do email (simples)
    if (!isValidEmail(email)) {
      setEmailError(true);
      return;
    }

    if (profile === "professor") {
      navigate("/dashboard-teachers");
    } else if (profile === "estudante") {
      navigate("/dashboard-students");
    } else {
      console.error("Perfil inválido");
    }
  };

  const isValidEmail = (email: string) => {
    // Validação simples de email
    const re = /^[a-zA-Z0-9._%+-]+@uea\.edu\.br$/;
    return re.test(String(email).toLowerCase());
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
          onChange={handleEmailChange}
          placeholder="exemplo@instituição.edu.br"
          errorMessage="Email inválido. Use o formato: exemplo@instituição.edu.br"
          isError={emailError}
        />

        <InputField
          label="Senha"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Digite sua senha"
        />

        <div>
          <label
            htmlFor="profile"
            className="block text-sm font-semibold text-gray-700 mb-2 text-left"
          >
            Perfil
          </label>
          <select
            id="profile"
            name="profile"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecione o perfil
            </option>
            <option value="professor">Professor</option>
            <option value="estudante">Estudante</option>
            <option value="admin">Técnico Administrativo</option>
          </select>
        </div>

        <Button type="submit">Entrar</Button>
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
