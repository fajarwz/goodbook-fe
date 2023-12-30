import PropTypes from 'prop-types';

export default function Td({ value, addClassName }) {
    return (
        <td className={`px-6 align-middle text-xs whitespace-nowrap p-4 text-left ${addClassName}`}>
            {value}
        </td>
    )
}

Td.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    addClassName: PropTypes.string,
}