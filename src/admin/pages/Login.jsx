import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { LoginForm, Header } from '../features/login';
import { login } from '../api/auth';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    mutate({ formData: data })
  }

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/admin/dashboard');
    },
  })

  return (
    <>
      <div className="flex items-center justify-center flex-col h-screen">
        <Header />
        <LoginForm
          handleSubmit={handleSubmit}
          isError={isError}
          error={error}
          isPending={isPending}
        />
      </div>
    </>
  )
}

export default Login