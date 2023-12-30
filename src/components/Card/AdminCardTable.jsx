import PropTypes from 'prop-types';

export default function AdminCardTable({ title, children }) {
    return (
        <div className="card">
            <h1 className="text-2xl">{title}</h1>
            {children}
        </div>
    )
}

AdminCardTable.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
}