import PropTypes from 'prop-types';

import { Input } from "../../components/Form"
import { useEffect, useState } from 'react';
import { ErrorBlock } from '../../../common/components';
import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

export default function LoginForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors }
    } = useForm({ mode: 'onChange' });

    useEffect(() => {
        setFocus('email')
    }, [setFocus])

    const onSubmit = (data) => {
        mutate(data)
    }

    const [errorNotif, setErrorNotif] = useState()
    const { mutate, isPending } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            navigate('/admin/dashboard');
        },
        onError: (error) => {
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
    })

    return (
        <div className='max-w-80'>
            {errorNotif && <ErrorBlock title={errorNotif.title} message={errorNotif.message} />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label htmlFor='email' className='block mb-3'>Email</label>
                    <Input id='email' type='email' addClassName={errors?.email && 'border-red-500'} {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Email must be valid',
                        }
                    })} />
                    {errors?.email && <div className='text-red-500'><small>{errors?.email?.message}</small></div>}
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' className='block mb-3'>Password</label>
                    <Input id='password' type='password' addClassName={errors?.password && 'border-red-500'} {...register('password', {
                        required: 'Password is required',
                    })} />
                    {errors?.password && <div className='text-red-500'><small>{errors?.password?.message}</small></div>}
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
    formData: PropTypes.object,
    setFormData: PropTypes.func,
}