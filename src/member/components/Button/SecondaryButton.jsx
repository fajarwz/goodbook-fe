import PropTypes from 'prop-types';

export default function SecondaryButton({ children, addClassName, ...attributes }) {
    return <button className={`rounded-md border border-orange-default bg-white text-orange-default text-center hover:bg-customWhite-dark font-bold inline-block w-28 min-h-10 align-middle leading-9 ${addClassName}`} {...attributes}>{children}</button>
}

SecondaryButton.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
    ]),
    addClassName: PropTypes.string,
}