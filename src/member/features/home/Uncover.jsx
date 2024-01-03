import { Link } from 'react-router-dom'
import { func, string, array, object, bool } from 'prop-types';

import search from '../../assets/img/search.svg'
import { ErrorBlock, LoadingIndicator } from '../../../common/components';

export default function Uncover({ title, handleSearch, data, isLoading, isError, error }) {
    let loadingOrErrorPlaceholder = <></>

    if (isLoading) {
        loadingOrErrorPlaceholder = <div className="text-center">
            <LoadingIndicator />
        </div>
    }

    if (isError) {
        loadingOrErrorPlaceholder = <ErrorBlock
            title="An error occured"
            message={error.info?.message || 'Failed to fetch data'}
        />
    }

    let dataElems = <></>
    if (data) {
        dataElems = <ul className='flex flex-wrap gap-x-7 gap-y-4 justify-center font-bold'>
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
                    <input type="text" name='search' placeholder='Search books' className="placeholder:text-gray-dark border-4 border-orange-default rounded-md bg-transparent p-3 w-[480px] leading-3" />
                    <img src={search} alt="Search icon" className="relative right-9" />
                </form>
                <div>
                    {loadingOrErrorPlaceholder}
                    {dataElems}
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