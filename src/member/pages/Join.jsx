import { useNavigate } from "react-router-dom";
import { Hero, Content } from "../features/join";
import { useMutation } from "@tanstack/react-query";
import { join } from "../api/auth";
import { ErrorBlock } from "../../common/components";
import { JoinContext } from "../hooks/context/auth";

export default function Join() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        mutate({ formData: data })
    }

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: join,
        onSuccess: () => {
            navigate('/browse');
        },
    })

    let errorNotif = <></>
    if (isError) {
        console.log(error)
        if (error instanceof Error) {
            errorNotif = <ErrorBlock title={error.message} message='' />
        }
        else {
            errorNotif = <ErrorBlock title='' message={
                <ul className='mb-0'>
                    {Object.entries(error).map(([key, message]) => (
                        <li className='list-disc' key={key}>{message}</li>
                    ))}
                </ul>
            } />
        }
    }

    return (
        <div className="bg-customWhite-warm grid grid-cols-12 min-h-screen overflow-y-hidden">
            <Hero />
            <JoinContext.Provider value={{
                handleSubmit,
                errorNotif,
                isPending,
            }} >
                <Content />
            </JoinContext.Provider>
        </div>
    )
}