import Login from "./Login"
import Register from "./Register"

const LoginPage = () => {
  const currentRoute: string = window.location.pathname;

  return (
    <div className="h-auto w-96">
      { currentRoute === '/login' ? <Login /> : <Register /> }
    </div>

  )
}

export default LoginPage;
