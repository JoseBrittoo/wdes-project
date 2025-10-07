import { useState } from "react";
import InputField from "./InputField";
import Button from "../../../components/Button";
import { cpfFormatter, cpfDeformatter } from "../../../components/CPFFormatter"; // Já importando a função para formatar e deformatar
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [cpfError, setCpfError] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCpf = cpfFormatter(event.target.value);
    setCpf(formattedCpf);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const unformattedCpf = cpfDeformatter(cpf);

    if (!isValidCPF(unformattedCpf)) {
      setCpfError(true);
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

  const isValidCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;

    return true;
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="CPF *"
          type="text"
          id="cpf"
          value={cpf}
          onChange={handleCpfChange}
          placeholder="000.000.000-00"
          errorMessage="CPF inválido. Use o formato: 000.000.000-00"
          isError={cpfError}
        />

        <InputField
          label="Senha *"
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
            Perfil *
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
