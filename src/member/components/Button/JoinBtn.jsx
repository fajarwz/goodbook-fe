import PrimaryLink from "./PrimaryLink";

export default function JoinBtn({ addClassName }) {
    return (
        <PrimaryLink addClassName={`w-28 mr-4 ${addClassName}`}>Join</PrimaryLink>
    )
}