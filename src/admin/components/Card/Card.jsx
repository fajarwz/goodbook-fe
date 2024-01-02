import PropTypes from 'prop-types';

export default function Card({ children }) {
    return (
        <div className="card">{children}</div>
    )
}

Card.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.element,
    ]),
}