import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export default function SecondaryLink({ children, addClassName, ...attributes }) {
    return (
        <Link className={`rounded-md border border-orange-default bg-white text-orange-default hover:bg-customWhite-dark font-bold inline-block w-28 min-h-10 align-middle leading-9 ${addClassName}`} {...attributes}>{children}</Link>
    )
}

SecondaryLink.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
    ]),
    addClassName: PropTypes.string,
}