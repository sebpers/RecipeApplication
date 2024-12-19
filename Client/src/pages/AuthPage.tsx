import Login from "./LoginPage";
import Register from "./RegisterPage";

const AuthPage = () => {
  const currentRoute: string = window.location.pathname;

  return (
    <div className="h-auto w-96">
      {currentRoute === "/login" ? <Login /> : <Register />}
    </div>
  );
};

export default AuthPage;
