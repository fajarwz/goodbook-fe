import PropTypes from 'prop-types';

export default function Th({ headNames, addClassName }) {
    return (
        headNames.map(headName => (
            <th key={headName} className={`px-6 align-middle border border-solid py-3 text-xs uppercase whitespace-nowrap font-semibold text-left ${addClassName}`}>
                {headName}
            </th>
        ))
    )
}

Th.propTypes = {
    headNames: PropTypes.array.isRequired,
    addClassName: PropTypes.string,
}