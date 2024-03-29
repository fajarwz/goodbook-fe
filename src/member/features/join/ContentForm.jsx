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
                        minLength: 2,
                        maxLength: 255,
                        required: true,
                    })} />
                    {errors?.name?.type === 'minLength' && <div className='text-red-500'><small>Minimum length is 2</small></div>}
                    {errors?.name?.type === 'maxLength' && <div className='text-red-500'><small>Maximum length is 255</small></div>}
                </div>
                <div className='mb-4'>
                    <label htmlFor='email' className='block mb-3'>Email</label>
                    <Input type='email' id='email' addClassName={errors?.email && 'border-red-500'} {...register('email', {
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        maxLength: 255,
                        required: true,
                    })} />
                    {errors?.email?.type === 'pattern' && <div className='text-red-500'><small>Email must be valid</small></div>}
                    {errors?.email?.type === 'maxLength' && <div className='text-red-500'><small>Maximum length is 255</small></div>}
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' className='block mb-3'>Password</label>
                    <Input type='password' id='password' addClassName={errors?.password && 'border-red-500'} {...register('password', {
                        minLength: 6,
                        maxLength: 255,
                        required: true,
                    })} />
                    {errors?.password?.type === 'minLength' && <div className='text-red-500'><small>Minimum length is 6</small></div>}
                    {errors?.password?.type === 'maxLength' && <div className='text-red-500'><small>Maximum length is 255</small></div>}
                </div>
                <div className='mb-4'>
                    <label htmlFor='password_confirmation' className='block mb-3'>Confirm Password</label>
                    <Input type='password' id='password_confirmation' addClassName={errors?.password_confirmation && 'border-red-500'} {...register('password_confirmation', {
                        required: true,
                        validate: (val) => {
                            if (watch('password') !== val) {
                                return "Confirm Password must be the same with Password";
                            }
                        },
                    })} />
                    {errors?.password_confirmation?.type === 'validate' && <div className='text-red-500'><small>{errors?.password_confirmation?.message}</small></div>}
                </div>
                <div>
                    <PrimaryButton type='submit' addClassName={`w-full ${isPending ? 'disabled' : ''}`}>{isPending ? 'Please wait...' : 'Join'}</PrimaryButton>
                </div>
            </form>
        </>
    )
}