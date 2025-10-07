import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="login-container min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo</h1>
          <p className="text-gray-600">Faça login para acessar o sistema</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
