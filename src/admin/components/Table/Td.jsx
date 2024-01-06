import PropTypes from 'prop-types';

export default function Td({ addClassName, children, ...attributes }) {
    return (
        <td className={`px-6 align-middle text-xs p-4 text-left ${addClassName ?? ''}`} {...attributes}>
            {children}
        </td>
    )
}

Td.propTypes = {
    children: PropTypes.any,
    addClassName: PropTypes.string,
}