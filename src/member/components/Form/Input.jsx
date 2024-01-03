import { string } from 'prop-types';

export default function Input({ addClassName, ...attributes }) {
    return (
        <input className={`h-11 min-w-80 border rounded-md border-gray-default p-3 bg-transparent ${addClassName}`} {...attributes} />
    )
}

Input.propTypes = {
    addClassName: string,
}