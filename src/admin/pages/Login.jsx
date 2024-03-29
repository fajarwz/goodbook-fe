import { LoginForm, Header } from '../features/login';

function Login() {
  return (
    <>
      <div className="flex items-center justify-center flex-col h-screen">
        <Header />
        <LoginForm />
      </div>
    </>
  )
}

export default Login