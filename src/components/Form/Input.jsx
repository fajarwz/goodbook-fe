import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const Input = forwardRef(function Input(props, ref) {
    const { addClassName, ...attributes } = props
    return (
        <input className={`h-11 w-80 border rounded-md border-gray-default p-3 ${addClassName}`} {...attributes} ref={ref} />
    )
})

export default Input

Input.propTypes = {
    addClassName: PropTypes.string,
}