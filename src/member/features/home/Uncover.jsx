import { Link } from 'react-router-dom'
import { func, string, array, object, bool } from 'prop-types';

import search from '../../assets/img/search.svg'
import { ErrorBlock, LoadingIndicator } from '../../../common/components';

export default function Uncover({ title, handleSearch, data, isLoading, isError, error }) {
    let content = <></>

    if (isLoading) {
        content = <div className="text-center">
            <LoadingIndicator />
        </div>
    }

    if (isError) {
        content = <ErrorBlock title={error.message} />
    }

    if (data) {
        content = <ul className='flex flex-wrap gap-x-7 gap-y-4 justify-center font-bold'>
            {data.map(obj => {
                return <li key={obj.id}><Link>{obj.name}</Link></li>
            })}
        </ul>
    }

    return (
        <section className="bg-black-default py-20 text-white text-center">
            <div className="container">
                <h1 className="mb-7">{title}</h1>
                <form onSubmit={handleSearch} className="flex justify-center mb-7">
                    <input type="text" name='search' placeholder='Search books' className="placeholder:text-gray-dark border-4 border-orange-default rounded-md bg-transparent p-3 w-[480px] leading-3 pr-12" />
                    <img src={search} alt="Search icon" className="relative right-9" />
                </form>
                <div>
                    {content}
                </div>
            </div>
        </section>
    )
}

Uncover.propTypes = {
    title: string,
    handleSearch: func,
    data: array,
    isLoading: bool,
    isError: bool,
    error: object,
}