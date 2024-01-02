import PropTypes from 'prop-types';

import { ErrorBlock } from "../../../common/components"
import { Input } from "../../components/Form"

export default function LoginForm({ handleSubmit, isError, errorNotif, isPending }) {
    return (
        <>
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
        </>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func,
    isError: PropTypes.bool,
    errorNotif: PropTypes.element,
    isPending: PropTypes.bool,
}