import PropTypes from 'prop-types';

export default function Card({ children }) {
    return (
        <div className="bg-white rounded-2xl p-8">{children}</div>
    )
}

Card.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.element,
    ]),
}