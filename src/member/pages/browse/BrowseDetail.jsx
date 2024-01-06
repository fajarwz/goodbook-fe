import { Footer, Navbar } from '../../components'

import config from '../../utils/config'
import { useTitle } from '../../../common/hooks'
import { Content } from '../../features/browse/detail'
import { useQuery } from '@tanstack/react-query'
import { fetchBookBySlug } from '../../api/books'
import { useParams } from 'react-router-dom'

export default function BrowseDetail() {
    const { slug } = useParams()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['books', { slug }],
        queryFn: ({ signal, queryKey }) => fetchBookBySlug({ signal, ...queryKey[1] }),
    })

    useTitle('Detail | ' + config.app.name)

    return (
        <div className='bg-customWhite-warm'>
            <Navbar />
            <Content data={data} isLoading={isLoading} isError={isError} error={error} />
            <Footer />
        </div>
    )
}