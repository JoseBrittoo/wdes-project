import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="login-container min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md fade-in">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo</h1>
          <p className="text-gray-600">Faça login para acessar o sistema</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
