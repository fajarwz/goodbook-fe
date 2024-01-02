import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Logo, Heading, LoginForm } from '../features/login';
import { login } from '../api/auth';
import { ErrorBlock } from '../../common/components';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    mutate({ formData: data })
  }

  const { mutate, data, isPending, isError } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/admin/dashboard');
    },
  })

  let errorNotif = <></>
  if (data?.status === 'fail') {
    errorNotif = <ErrorBlock title='' message={
      <ul className='mb-0'>
        {Object.entries(data.data).map(([key, error]) => (
          <li key={key}>{error}</li>
        ))}
      </ul>
    } />
  }

  return (
    <>
      <div className="flex items-center justify-center flex-col h-screen">
        <div className="mb-10">
          <Logo />
          <Heading text="Login to continue" />
        </div>
        <div>
          <LoginForm
            handleSubmit={handleSubmit}
            isError={isError}
            errorNotif={errorNotif}
            isPending={isPending}
          />
        </div>
      </div>
    </>
  )
}

export default Login