import { useEffect, useState } from "react";
import { PrimaryButton } from "../../components/Button";
import { Input } from "../../components/Form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { join } from "../../api/auth";
import { ErrorBlock } from "../../../common/components";
import { useForm } from "react-hook-form";

export default function ContentForm() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setFocus,
        watch,
        formState: { errors }
    } = useForm({ mode: 'onChange' });

    useEffect(() => {
        setFocus('name')
    }, [setFocus])

    const onSubmit = (data) => {
        mutate(data)
    }

    const [errorNotif, setErrorNotif] = useState()
    const { mutate, isPending } = useMutation({
        mutationFn: join,
        onSuccess: () => {
            navigate('/browse');
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
        <>
            {errorNotif && <ErrorBlock title={errorNotif.title} message={errorNotif.message} />}
            <form onSubmit={handleSubmit(onSubmit)} className='mb-6'>
                <div className='mb-4'>
                    <label htmlFor='name' className='block mb-3'>Name</label>
                    <Input id='name' addClassName={errors?.name && 'border-red-500'} {...register('name', {
                        minLength: {
                            value: 2,
                            message: 'Minimum length is 2',
                        },
                        maxLength: {
                            value: 255,
                            message: 'Maximum length is 255',
                        },
                        required: 'Name is required',
                    })} />
                    {errors?.name && <div className='text-red-500'><small>{errors?.name?.message}</small></div>}
                </div>
                <div className='mb-4'>
                    <label htmlFor='email' className='block mb-3'>Email</label>
                    <Input type='email' id='email' addClassName={errors?.email && 'border-red-500'} {...register('email', {
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Email must be valid',
                        },
                        maxLength: {
                            value: 255,
                            message: 'Maximum length is 255',
                        },
                        required: 'Email is required',
                    })} />
                    {errors?.email && <div className='text-red-500'><small>{errors?.email?.message}</small></div>}
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' className='block mb-3'>Password</label>
                    <Input type='password' id='password' addClassName={errors?.password && 'border-red-500'} {...register('password', {
                        minLength: {
                            value: 6,
                            message: 'Minimum length is 6',
                        },
                        maxLength: {
                            value: 255,
                            message: 'Maximum length is 255',
                        },
                        required: 'Password is required',
                    })} />
                    {errors?.password && <div className='text-red-500'><small>{errors?.password?.message}</small></div>}
                </div>
                <div className='mb-4'>
                    <label htmlFor='password_confirmation' className='block mb-3'>Confirm Password</label>
                    <Input type='password' id='password_confirmation' addClassName={errors?.password_confirmation && 'border-red-500'} {...register('password_confirmation', {
                        required: 'Confirm Password is required',
                        validate: (val) => {
                            if (watch('password') !== val) {
                                return "Confirm Password must be the same with Password";
                            }
                        },
                    })} />
                    {errors?.password_confirmation && <div className='text-red-500'><small>{errors?.password_confirmation?.message}</small></div>}
                </div>
                <div>
                    <PrimaryButton type='submit' addClassName={`w-full ${isPending ? 'disabled' : ''}`}>{isPending ? 'Please wait...' : 'Join'}</PrimaryButton>
                </div>
            </form>
        </>
    )
}