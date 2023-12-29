import logo from '../assets/img/Goodbook.png'

function Login() {
    return (
        <>
          <div className="flex items-center justify-center flex-col h-screen">
            <div className="mb-10">
              <img src={logo} className='mb-4' alt="Goodbook logo" width={161} height={40} />
              <div className='text-center'>Login to continue</div>
            </div>
            <div className="card">
              <div className='mb-4'>
                <div className='mb-3'>Email</div>
                <div>
                  <input type="text" className="form-input" />
                </div>
              </div>
              <div className='mb-4'>
                <div className='mb-3'>Password</div>
                <div>
                  <input type="password" className="form-input" />
                </div>
              </div>
              <div>
                <button className='btn btn-primary w-full'>Log In</button>
              </div>
            </div>
          </div>
        </>
      )
}

export default Login