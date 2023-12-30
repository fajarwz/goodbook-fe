import PropTypes from 'prop-types';

import Tbody from "./Tbody";
import Thead from "./Thead";

export default function Table({ head, body }) {
    return (
        <div className='overflow-x-scroll max-h-[430px]'>
            <table className="items-center bg-transparent border-collapse">
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
    head: PropTypes.object.isRequired,
    body: PropTypes.array.isRequired,
}