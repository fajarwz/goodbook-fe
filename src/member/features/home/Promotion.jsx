import { Link } from 'react-router-dom'

import { ErrorBlock, LoadingIndicator } from '../../../common/components'

export default function Promotion({ title, isLoading, isError, error, children }) {
    let loadingOrErrorPlaceholder = ''

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

    return (
        <section className="bg-customWhite-warm py-20">
            <div className="container">
                <div className='flex justify-between items-center mb-8'>
                    <h1 className="mb-0">{title}</h1>
                    <div>
                        <Link>
                            <span className='font-bold hidden sm:inline-block'>Browse</span>&nbsp;<span className='font-bold text-3xl sm:text-base' title="Browse">&gt;</span>
                        </Link>
                    </div>
                </div>
                {loadingOrErrorPlaceholder}
                <div className='grid grid-rows-1 md:grid-cols-2 gap-10'>
                    {children}
                </div>
            </div>
        </section>
    )
}