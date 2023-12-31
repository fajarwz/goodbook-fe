import PropTypes from 'prop-types';

export default function AdminCardTable({ title, attribute, children }) {
    return (
        <div className="card">
            <h1 className="text-2xl">{title}</h1>
            {attribute}
            {children}
        </div>
    )
}

AdminCardTable.propTypes = {
    title: PropTypes.string.isRequired,
    attribute: PropTypes.object,
    children: PropTypes.object.isRequired,
}