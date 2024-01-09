import { bool, number, object, oneOfType, string } from "prop-types"

export default function InputRadio({ addClassName, name, value, defaultChecked, children }) {
    return (
        <div className={`flex items-center ${addClassName}`}>
            <input type="radio" name={name} value={value} defaultChecked={defaultChecked ? 'defaultChecked' : ''} id={`${name}-${value}`} className="mr-3 bg-transparent w-5 h-5 border-gray-default text-orange-default" />
            <label htmlFor={`${name}-${value}`} className="cursor-pointer select-none text-slate-700 flex">
                {children}
            </label>
        </div>
    )
}

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