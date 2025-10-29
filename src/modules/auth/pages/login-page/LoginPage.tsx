import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="login-container min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md fade-in">
        <div className="text-center mb-8">
          <img
            src="./src/assets/logo.png"
            alt="Logo do Sistema"
            className="mx-auto w-24 h-24"
          />
          <h1 className="text-3xl font-bold text-[#032912] mb-2">Bem-vindo</h1>
          <p className="text-[#072E13]">Faça login para acessar o sistema</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
