import { bool, number, object, oneOfType, string } from "prop-types"
import { forwardRef, useRef } from "react";

const InputRadio = forwardRef(({ addClassName, name, value, defaultChecked, children }, ref) => {
    const inputRef = useRef(null);
    return (
        <div className={`flex items-center ${addClassName}`}>
            <input ref={ref ?? inputRef} type="radio" name={name} value={value} defaultChecked={defaultChecked ? 'defaultChecked' : ''} id={`${name}-${value}`} className="mr-3 bg-transparent w-5 h-5 border-gray-default text-orange-default" />
            <label htmlFor={`${name}-${value}`} className="cursor-pointer select-none text-slate-700 flex">
                {children}
            </label>
        </div>
    )
})

export default InputRadio
InputRadio.displayName = 'InputRadio';

InputRadio.propTypes = {
    addClassName: string,
    children: oneOfType([
        object,
        string,
    ]),
    name: string,
    value: oneOfType([
        number,
        string,
    ]),
    defaultChecked: bool,
}