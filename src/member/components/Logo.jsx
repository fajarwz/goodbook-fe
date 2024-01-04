import { string } from "prop-types"

export default function Logo({ logo }) {
    return <img src={logo} alt="Goodbook logo" className="h-6" height="24" />
}

Logo.propTypes = {
    logo: string,
}