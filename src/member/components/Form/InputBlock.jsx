import { string } from "prop-types";
import Input from "./Input";

export default function InputBlock({ type, name, label, ...attribute }) {
    return (
        <div className='mb-4' {...attribute}>
            <label htmlFor={name} className='block mb-3'>{label}</label>
            <Input id={name} name={name} type={type} />
        </div>
    )
}

InputBlock.propTypes = {
    type: string,
    name: string,
    label: string,
}