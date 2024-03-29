import { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "../../components/Button";
import { Input, InputBlock } from "../../components/Form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../api/auth";
import { ErrorBlock } from "../../../common/components";

export default function ContentForm() {
    const emailInput = useRef(null)
    useEffect(() => {
        emailInput.current.focus()
    }, [])

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        mutate({ formData: data })
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
        <form onSubmit={handleSubmit} className='mb-6'>
            <div className='mb-4'>
                <label htmlFor='email' className='block mb-3'>Email</label>
                <Input id='email' name='email' ref={emailInput} />
            </div>
            <InputBlock type='password' name='password' label='Password' />
            <div>
                <PrimaryButton type='submit' addClassName={`w-full ${isPending ? 'disabled' : ''}`}>{isPending ? 'Please wait...' : 'Sign In'}</PrimaryButton>
            </div>
        </form>
        </>
    )
}