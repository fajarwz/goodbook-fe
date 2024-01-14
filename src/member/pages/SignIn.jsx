import { Hero, Content } from "../features/sign-in";

export default function SignIn() {
    return (
        <div className="bg-customWhite-warm flex flex-row flex-grow-0 min-h-screen overflow-y-hidden">
            <Hero />
            <Content />
        </div>
    )
}