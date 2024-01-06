import PropTypes from 'prop-types';

export default function Tr({ addClassName, children, ...attributes }) {
    return (
        <tr className={`${addClassName ?? ''}`} {...attributes}>
            {children}
        </tr>
    )
}

Tr.propTypes = {
    addClassName: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element,
    ]),
}