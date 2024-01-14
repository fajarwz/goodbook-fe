import { useEffect, useRef, useState } from "react";
import { PrimaryButton } from "../../components/Button";
import { Input, InputBlock } from "../../components/Form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { join } from "../../api/auth";
import { ErrorBlock } from "../../../common/components";

export default function ContentForm() {
    const nameInput = useRef(null)
    useEffect(() => {
        nameInput.current.focus()
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
        <form onSubmit={handleSubmit} className='mb-6'>
            <div className='mb-4'>
                <label htmlFor='name' className='block mb-3'>Name</label>
                <Input id='name' name='name' ref={nameInput} />
            </div>
            <InputBlock type='email' name='email' label='Email' />
            <InputBlock type='password' name='password' label='Password' />
            <InputBlock type='password' name='password_confirmation' label='Confirm Password' />
            <div>
                <PrimaryButton type='submit' addClassName={`w-full ${isPending ? 'disabled' : ''}`}>{isPending ? 'Please wait...' : 'Join'}</PrimaryButton>
            </div>
        </form>
        </>
    )
}