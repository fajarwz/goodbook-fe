import PropTypes from 'prop-types';

export default function Th({ headNames, addClassName, ...attributes }) {
    return (
        headNames.map(headName => (
            <th key={headName} className={`px-6 align-middle border border-solid py-3 text-xs uppercase font-semibold text-left ${addClassName ?? ''}`} {...attributes}>
                {headName}
            </th>
        ))
    )
}

Th.propTypes = {
    headNames: PropTypes.array.isRequired,
    addClassName: PropTypes.string,
}