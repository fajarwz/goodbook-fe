import { useTitle } from "../../common/hooks";
import { Hero, Content } from "../features/join";
import config from "../utils/config";

export default function Join() {
    useTitle('Join the reading world | ' + config.app.name)

    return (
        <div className="bg-customWhite-warm flex flex-row flex-grow-0 min-h-screen overflow-y-hidden">
            <Hero />
            <Content />
        </div>
    )
}