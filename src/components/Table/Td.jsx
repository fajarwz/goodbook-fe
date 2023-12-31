import PropTypes from 'prop-types';

export default function Td({ value, addClassName, ...attributes }) {
    return (
        <td className={`px-6 align-middle text-xs p-4 text-left ${addClassName ?? ''}`} {...attributes}>
            {value}
        </td>
    )
}

Td.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
    ]),
    addClassName: PropTypes.string,
}