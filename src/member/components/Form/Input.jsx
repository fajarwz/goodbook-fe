import { string } from 'prop-types';
import { forwardRef, useRef } from 'react';

const Input = forwardRef(({ addClassName, ...attributes }, ref) => {
    const inputRef = useRef(null);
    return (
        <input ref={ref ?? inputRef} className={`h-11 min-w-80 border rounded-md border-gray-default p-3 bg-transparent ${addClassName}`} {...attributes} />
    )
})

export default Input
Input.displayName = 'Input';

Input.propTypes = {
    addClassName: string,
}