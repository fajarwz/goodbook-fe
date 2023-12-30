import PropTypes from 'prop-types';

export default function Thead({ children }) {
    return (
        <thead>
            <tr>
                {children}
            </tr>
        </thead>
    )
}

Thead.propTypes = {
    children: PropTypes.element.isRequired,
}