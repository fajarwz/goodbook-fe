import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/Goodbook.png'
import { login } from '../utils/http/admin/auth';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true)

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    mutate({ formData: data })
  }

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      // TODO: save the user in the state
      navigate('/admin/dashboard');
    },
    // onError: (error, data, context) => {
      // rollback changes
      // queryClient.setQueryData(['events', id], context.previousEvent)
    // },
  })

    return (
        <>
          <div className="flex items-center justify-center flex-col h-screen">
            <div className="mb-10">
              <img src={logo} className='mb-4' alt="Goodbook logo" width={161} height={40} />
              <div className='text-center'>Login to continue</div>
            </div>
            <div className="card">
              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <div className='mb-3'>Email</div>
                  <div>
                    <input type="text" name="email" className="form-input" />
                  </div>
                </div>
                <div className='mb-4'>
                  <div className='mb-3'>Password</div>
                  <div>
                    <input type="password" name="password" className="form-input" />
                  </div>
                </div>
                <div>
                  <button type='submit' className={`btn btn-primary w-full ${isSubmitting ? 'disabled' : ''}`}>{isSubmitting ? 'Please wait...' : 'Log In'}</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )
}

export default Login