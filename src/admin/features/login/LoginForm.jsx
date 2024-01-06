import PropTypes from 'prop-types';

import { Input } from "../../components/Form"

export default function LoginForm({ handleSubmit, errorNotif, isPending }) {
    return (
        <div className='max-w-80'>
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
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func,
    errorNotif: PropTypes.element,
    isPending: PropTypes.bool,
}