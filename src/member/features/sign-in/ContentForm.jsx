import { useEffect, useState } from "react";
import { PrimaryButton } from "../../components/Button";
import { Input } from "../../components/Form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../api/auth";
import { ErrorBlock } from "../../../common/components";
import { useForm } from "react-hook-form";

export default function ContentForm() {
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
        mutationFn: signIn,
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
                    <Input id='password' name='password' type='password' addClassName={errors?.password && 'border-red-500'} {...register('password', {
                        required: 'Password is required',
                    })} />
                    {errors?.password && <div className='text-red-500'><small>{errors?.password?.message}</small></div>}
                </div>
                <div>
                    <PrimaryButton type='submit' addClassName={`w-full ${isPending ? 'disabled' : ''}`}>{isPending ? 'Please wait...' : 'Sign In'}</PrimaryButton>
                </div>
            </form>
        </>
    )
}