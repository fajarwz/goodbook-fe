import { string } from "prop-types";
import PrimaryLink from "./PrimaryLink";

export default function JoinBtn({ addClassName }) {
    return (
        <PrimaryLink to='/join' addClassName={`w-28 mr-4 ${addClassName}`}>Join</PrimaryLink>
    )
}

JoinBtn.propTypes = {
    addClassName: string,
}