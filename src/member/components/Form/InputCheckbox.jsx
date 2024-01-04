import { object, string } from "prop-types"

export default function InputCheckbox({ addClassName, name, children }) {
    const randomKey = Math.random() * 10

    return (
        <div className={`flex items-center ${addClassName}`}>
            <input type="checkbox" name={name} id={randomKey} className="mr-3 rounded-[4px] bg-transparent w-5 h-5 text-orange-default" />
            <label htmlFor={randomKey} className="cursor-pointer select-none text-slate-700 flex">
                {children}
            </label>
        </div>
    )
}

InputCheckbox.propTypes = {
    addClassName: string,
    children: object,
}