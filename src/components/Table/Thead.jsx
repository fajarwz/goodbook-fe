import PropTypes from 'prop-types';

export default function Thead({ children }) {
    return (
        <thead className='bg-slate-200'>
            <tr>
                {children}
            </tr>
        </thead>
    )
}

Thead.propTypes = {
    children: PropTypes.element,
}