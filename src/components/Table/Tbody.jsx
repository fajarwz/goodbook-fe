import PropTypes from 'prop-types';

export default function Tbody({ children }) {
    return (
        <tbody>
            {children}
        </tbody>
    )
}

Tbody.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.element,
    ]),
}