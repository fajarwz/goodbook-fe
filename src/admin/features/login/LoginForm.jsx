import PropTypes from 'prop-types';

import { Input } from "../../components/Form"
import { useEffect, useState } from 'react';
import { ErrorBlock } from '../../../common/components';

export default function LoginForm({ handleSubmit, isError, error, isPending }) {
    const [errorNotif, setErrorNotif] = useState()
    useEffect(() => {
        if (isError) {
            if (error instanceof Error) {
                setErrorNotif({
                    title: error.message,
                    message: '',
                })
            }
            else {
                setErrorNotif({
                    title: '',
                    message: error,
                })
            }
        }
    }, [isError, error])

    return (
        <div className='max-w-80'>
            {errorNotif && <ErrorBlock title={errorNotif.title} message={errorNotif.message} />}
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
    isError: PropTypes.bool,
    error: PropTypes.object,
    isPending: PropTypes.bool,
}