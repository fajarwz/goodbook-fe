import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { LoginForm, Header } from '../features/login';
import { login } from '../api/auth';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = (event) => {
    event.preventDefault();

    mutate({ formData })
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
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </>
  )
}

export default Login