import { useContext, useEffect, useRef } from "react";
import { PrimaryButton } from "../../components/Button";
import { Input, InputBlock } from "../../components/Form";
import { JoinContext } from "../../hooks/context/auth";

export default function ContentForm() {
    const nameInput = useRef(null)
    useEffect(() => {
        nameInput.current.focus()
    }, [])

    const { handleSubmit, isPending } = useContext(JoinContext)

    return (
        <section>
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
        </section>
    )
}