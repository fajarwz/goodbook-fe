import { useTitle } from "../../common/hooks";
import { Hero, Content } from "../features/sign-in";
import config from "../utils/config";

export default function SignIn() {
    useTitle('Sign In to continue reading | ' + config.app.name)

    return (
        <div className="bg-customWhite-warm flex flex-row flex-grow-0 min-h-screen overflow-y-hidden">
            <Hero />
            <Content />
        </div>
    )
}