import { Link } from 'react-router-dom'
import { string, bool, object, array } from 'prop-types';

import { ErrorBlock, LoadingIndicator } from '../../../common/components'
import PromotionCard from './PromotionCard'

export default function Promotion({ title, data, isLoading, isError, error }) {
    let content = <div className="text-center">No data found.</div>

    if (isLoading) {
        content = <div className="text-center">
            <LoadingIndicator />
        </div>
    }

    if (isError) {
        content = <ErrorBlock
            title="An error occured"
            message={error.info?.message || 'Failed to fetch data'}
        />
    }
    if (data?.length > 0) {
        content = (
            <div className='grid grid-rows-1 md:grid-cols-2 gap-10'>
                {data.map(book => {
                    return <PromotionCard key={book.id} book={book} />
                })}
            </div>
        )
    }

    return (
        <section className="bg-customWhite-warm py-20">
            <div className="container">
                <div className='flex justify-between items-center mb-8'>
                    <h1 className="mb-0">{title}</h1>
                    <div>
                        <Link to='/browse'>
                            <span className='font-bold hidden sm:inline-block'>Browse</span>&nbsp;<span className='font-bold text-3xl sm:text-base' title="Browse">&gt;</span>
                        </Link>
                    </div>
                </div>
                {content}
            </div>
        </section>
    )
}

Promotion.propTypes = {
    title: string,
    data: array,
    isLoading: bool,
    isError: bool,
    error: object,
}