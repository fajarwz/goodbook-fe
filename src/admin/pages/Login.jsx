import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/img/Goodbook.png'

import { login } from '../api/auth';

import { Input } from '../components/Form';
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

  let errorNotif = ''
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
              <img src={logo} className='mb-4' alt="Goodbook logo" width={161} height={40} />
              <div className='text-center'>Login to continue</div>
            </div>
            <div>
              {isError && <ErrorBlock />}
              {errorNotif}
              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <div className='mb-3'>Email</div>
                  <div>
                    <Input type="email" name="email" addClassName='w-full' />
                  </div>
                </div>
                <div className='mb-4'>
                  <div className='mb-3'>Password</div>
                  <div>
                    <Input type="password" name="password" addClassName='w-full' />
                  </div>
                </div>
                <div>
                  <button type='submit' className={`btn btn-primary w-full ${isPending ? 'disabled' : ''}`}>{isPending ? 'Please wait...' : 'Log In'}</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )
}

export default Login