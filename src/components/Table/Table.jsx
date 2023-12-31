import PropTypes from 'prop-types';

import Tbody from "./Tbody";
import Thead from "./Thead";

export default function Table({ head, body }) {
    return (
        <div className='overflow-x-scroll max-h-[400px]'>
            <table className="my-0 mx-auto w-full items-center bg-transparent border-collapse">
                <Thead>
                    {head}
                </Thead>
                <Tbody>
                    {body}
                </Tbody>
            </table>
        </div>
    )
}

Table.propTypes = {
    head: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.element,
    ]),
    body: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.element,
    ]),
}