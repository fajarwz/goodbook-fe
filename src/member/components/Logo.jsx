import { string } from "prop-types"

export default function Logo({ logo, addClassName }) {
    return <img src={logo} alt="Goodbook logo" className={`h-6 ${addClassName}`} height="24" />
}

Logo.propTypes = {
    logo: string,
    addClassName: string,
}