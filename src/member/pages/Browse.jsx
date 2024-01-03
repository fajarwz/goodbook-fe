import { Footer, Navbar } from '../components'

import config from '../utils/config'
import { useTitle } from '../../common/hooks'
import { Header, Content } from '../features/browse'

export default function Browse() {
    useTitle('Home | ' + config.app.name)

    // const { data: dataBest, isLoading: isLoadingBest, isError: isErrorBest, error: errorBest } = useQuery({
    //     queryKey: ['books', 'best'],
    //     queryFn: ({ signal }) => fetchBestBooks({ signal }),
    // })

    return (
        <div className='bg-customWhite-warm'>
            <Navbar />
            <Header title='Discover Great Reads' subtitle='Dive into a sea of great titles' />
            <Content />
            <Footer />
        </div>
    )
}