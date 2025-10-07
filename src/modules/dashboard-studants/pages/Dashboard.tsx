import Header from "../../../components/Header";

export default function DashboardStudents() {
  const user = { name: "João Silva" };
  const profileType = "professor";

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <div>
      <Header user={user} profileType={profileType} onLogout={handleLogout} />
      {/* O conteúdo da página vai aqui */}
    </div>
  );
}
