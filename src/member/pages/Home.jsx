import { Footer } from '../components'
import { Header, Ignite, Promotion, Uncover } from '../features/home'
import config from '../utils/config'
import { useTitle } from '../../common/hooks'
import { useQuery } from '@tanstack/react-query'
import { fetchBestBooks, fetchNewestBooks } from '../api/books'

export default function Home() {
    useTitle('Home | ' + config.app.name)

    const { data: dataBest, isLoading: isLoadingBest, isError: isErrorBest, error: errorBest } = useQuery({
        queryKey: ['books', 'best'],
        queryFn: ({ signal }) => fetchBestBooks({ signal }),
    })

    const { data: dataNewest, isLoading: isLoadingNewest, isError: isErrorNewest, error: errorNewest } = useQuery({
        queryKey: ['books', 'newest'],
        queryFn: ({ signal }) => fetchNewestBooks({ signal }),
    })

    const handleSearch = (event) => {

    }

    return (
        <>
            <Header />
            <Promotion 
                title="Highest Rating" 
                data={dataBest}
                isLoading={isLoadingBest} 
                isError={isErrorBest} 
                error={errorBest} 
            />
            <Uncover handleSearch={handleSearch} genres={[]} />
            <Promotion 
                title="New Releases" 
                data={dataNewest} 
                isLoading={isLoadingNewest} 
                isError={isErrorNewest} 
                error={errorNewest} 
            />
            <Ignite />
            <Footer />
        </>
    )
}