import { useContext, useEffect, useRef } from "react";
import { PrimaryButton } from "../../components/Button";
import { Input, InputBlock } from "../../components/Form";
import { SignInContext } from "../../hooks/context/auth";

export default function ContentForm() {
    const emailInput = useRef(null)
    useEffect(() => {
        emailInput.current.focus()
    }, [])

    const { handleSubmit, isPending } = useContext(SignInContext)

    return (
        <section>
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
        </section>
    )
}