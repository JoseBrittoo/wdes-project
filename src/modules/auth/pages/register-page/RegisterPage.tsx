import RegisterForm from "../../components/RegisterForm";

export default function RegisterPage() {
  const handleRegisterSubmit = (data: any) => {
    console.log("Usuário registrado:", data);
  };

  return (
    <div className="register-container min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Criar Conta</h1>
          <p className="text-gray-600">
            Preencha os dados para registrar sua conta
          </p>
        </div>

        <RegisterForm onSubmit={handleRegisterSubmit} />
      </div>
    </div>
  );
}
