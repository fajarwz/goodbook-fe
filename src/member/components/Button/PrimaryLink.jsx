import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export default function PrimaryLink({ children, addClassName, ...attributes }) {
    return (
        <Link className={`rounded-md bg-orange-default text-white hover:bg-orange-defaultDark font-bold inline-block min-w-10 min-h-10 align-middle leading-9 ${addClassName}`} {...attributes}>{children}</Link>
    )
}

PrimaryLink.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
    ]),
    addClassName: PropTypes.string,
}