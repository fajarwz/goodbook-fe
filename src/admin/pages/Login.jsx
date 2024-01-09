import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { LoginForm, Header } from '../features/login';
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

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/admin/dashboard');
    },
  })

  let errorNotif = <></>
  if (isError) {
    if (error instanceof Error) {
      errorNotif = <ErrorBlock title={error.message} message='' />
    }
    else {
      errorNotif = <ErrorBlock title='' message={
        <ul className='mb-0'>
          {Object.entries(error).map(([key, message]) => (
            <li className='list-disc' key={key}>{message}</li>
          ))}
        </ul>
      } /> 
    }
  }

  return (
    <>
      <div className="flex items-center justify-center flex-col h-screen">
        <Header />
        <LoginForm
          handleSubmit={handleSubmit}
          isError={isError}
          errorNotif={errorNotif}
          isPending={isPending}
        />
      </div>
    </>
  )
}

export default Login