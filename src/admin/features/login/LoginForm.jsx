import PropTypes from 'prop-types';

import { Input } from "../../components/Form"
import { useEffect, useRef, useState } from 'react';
import { ErrorBlock } from '../../../common/components';

export default function LoginForm({ handleSubmit, isError, error, isPending, formData, setFormData }) {
    const [errorNotif, setErrorNotif] = useState()
    const [isDisableSubmit, setIsDisableSubmit] = useState(false)
    const emailInput = useRef(null)

    useEffect(() => {
        const checkSubmitFormValidation = () => {
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
        }

        const validateEmail = (email) => {
            return email.match(
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            );
        };

        let isValid = false
        const checkInput = () => {
            if (formData.email) {
                isValid = validateEmail(formData.email);
            }

            if (!isValid && formData.email) {
                setErrorNotif({
                    title: '',
                    message: 'Email must be valid.',
                })
            }
            else {
                if (!isError) setErrorNotif()
            }
        }

        const checkSubmit = () => {
            setIsDisableSubmit(isPending || !formData.email || !formData.password || !isValid)
        }

        checkSubmitFormValidation()
        checkInput()
        checkSubmit()
    }, [formData, errorNotif, isError, error, isPending, isDisableSubmit])

    useEffect(() => {
        const emailFocus = () => {
            emailInput.current.focus()
        }

        emailFocus()
    }, [])

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    return (
        <div className='max-w-80'>
            {errorNotif && <ErrorBlock title={errorNotif.title} message={errorNotif.message} />}
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <div className='mb-3'>Email</div>
                    <div>
                        <Input type="email" name="email" addClassName='w-full' ref={emailInput} value={formData.email} onChange={(e) => handleFormChange(e)} />
                    </div>
                </div>
                <div className='mb-4'>
                    <div className='mb-3'>Password</div>
                    <div>
                        <Input type="password" name="password" addClassName='w-full' value={formData.password} onChange={(e) => handleFormChange(e)} />
                    </div>
                </div>
                <div>
                    <button type='submit' className={`btn btn-primary w-full ${isDisableSubmit ? 'disabled' : ''}`}>{isPending ? 'Please wait...' : 'Log In'}</button>
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
    formData: PropTypes.object,
    setFormData: PropTypes.func,
}