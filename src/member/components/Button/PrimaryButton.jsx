import PropTypes from 'prop-types';

export default function PrimaryButton({ children, addClassName, ...attributes }) {
    return <button className={`rounded-md bg-orange-default text-white text-center hover:bg-orange-defaultDark font-bold inline-block min-w-10 min-h-10 align-middle leading-9 ${addClassName}`} {...attributes}>{children}</button>
}

PrimaryButton.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
    ]),
    addClassName: PropTypes.string,
}