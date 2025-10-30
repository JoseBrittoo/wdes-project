import React, { useState } from "react";
import InputField from "./InputField";
import { Button } from "../../../components/Button";
import { useNavigate } from "react-router-dom";

type RegisterFormProps = {
  onSubmit: (data: any) => void;
  disabled?: boolean;
};

const COURSE_SLUG_TO_ID: Record<string, number> = {
  licenciatura_computacao: 1,
  sistemas_informacao: 2,
  engenharia_computacao: 3,
};

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [course, setCourse] = useState("");
  const [profile, setProfile] = useState("");
  const [isCotista, setIsCotista] = useState(false);
  const [cota, setCota] = useState("");
  const [isPcD, setIsPcD] = useState(false);
  const [deficiencia, setDeficiencia] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    matricula: "",
    course: "",
    password: "",
    confirmPassword: "",
    deficiencia: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let valid = true;
    let newErrors = { ...errors };

    if (!name) {
      newErrors.name = "Nome completo é obrigatório.";
      valid = false;
    }
    if (!email || !email.includes("@")) {
      newErrors.email = "Email institucional inválido.";
      valid = false;
    }
    if (profile !== "admin" && (!matricula || matricula.length !== 10)) {
      newErrors.matricula = "Matrícula deve ter 10 dígitos.";
      valid = false;
    }

    if (!course) {
      newErrors.course = "Selecione um curso.";
      valid = false;
    }
    if (!password) {
      newErrors.password = "Senha é obrigatória.";
      valid = false;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
      valid = false;
    }
    if (isPcD && !deficiencia) {
      newErrors.deficiencia = "Por favor, especifique a deficiência.";
      valid = false;
    }

    // Se já falhou até aqui, atualiza erros e sai
    if (!valid) {
      setErrors(newErrors);
      return;
    }

    const selectedCourseId = COURSE_SLUG_TO_ID[course];
    if (!selectedCourseId) {
      setErrors({ ...newErrors, course: "Curso inválido." });
      return;
    }

    setErrors(newErrors);

    onSubmit({
      name,
      email,
      matricula,
      course,
      courseId: selectedCourseId, // envia o ID do curso
      isCotista,
      cota,
      isPcD,
      deficiencia,
      password,
      profile,
    });
  };

  const handleGoToLogin = () => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <InputField
          label="Nome Completo"
          placeholder="Seu nome completo"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          isError={!!errors.name}
          errorMessage={errors.name}
        />
        <InputField
          label="Email Institucional"
          placeholder="exemplo@instituição.edu.br"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isError={!!errors.email}
          errorMessage={errors.email}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Matrícula"
          type="text"
          id="matricula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          placeholder="Digite sua matrícula (10 dígitos)"
          isError={!!errors.matricula}
          errorMessage={errors.matricula}
        />
        <div>
          <label
            htmlFor="course"
            className="block text-sm font-semibold text-[#032912] mb-2"
          >
            Curso
          </label>
          <select
            id="course"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="">Selecione o curso</option>
            <option value="licenciatura_computacao">
              Licenciatura em Computação
            </option>
            <option value="sistemas_informacao">Sistema de Informação</option>
            <option value="engenharia_computacao">
              Engenharia da Computação
            </option>
          </select>
          {errors.course && (
            <p className="text-red-500 text-sm">{errors.course}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isCotista}
              onChange={(e) => setIsCotista(e.target.checked)}
            />
            <span className="text-sm font-semibold text-[#032912]">
              Sou cotista
            </span>
          </label>
          {isCotista && (
            <InputField
              label="Especifique a Cota"
              type="text"
              id="cota"
              value={cota}
              onChange={(e) => setCota(e.target.value)}
              placeholder="Especifique sua cota (ex: PCD)"
            />
          )}
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isPcD}
              onChange={(e) => setIsPcD(e.target.checked)}
            />
            <span className="text-sm font-semibold text-[#032912]">
              Sou PcD (Pessoa com Deficiência)
            </span>
          </label>
          {isPcD && (
            <InputField
              label="Especifique a Deficiência"
              type="text"
              id="deficiencia"
              value={deficiencia}
              onChange={(e) => setDeficiencia(e.target.value)}
              placeholder="Especifique sua deficiência"
              isError={!!errors.deficiencia}
              errorMessage={errors.deficiencia}
            />
          )}
        </div>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Senha"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isError={!!errors.password}
          errorMessage={errors.password}
        />
        <InputField
          label="Confirmar Senha"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          isError={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
        />
      </div>

      <Button type="submit">Registrar</Button>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Já tem uma conta?{" "}
          <button
            onClick={handleGoToLogin}
            className="text-[#032912] hover:underline"
          >
            Faça login aqui.
          </button>
        </p>
      </div>
    </form>
  );
}
