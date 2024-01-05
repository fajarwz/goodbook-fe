import { Footer } from '../components'
import { Header, Ignite, Promotion, Uncover } from '../features/home'
import config from '../utils/config'
import { useTitle } from '../../common/hooks'
import { useQuery } from '@tanstack/react-query'
import { fetchBestBooks, fetchNewestBooks } from '../api/books'
import { fetchGenres } from '../api/genres'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    useTitle('Home | ' + config.app.name)
    const navigate = useNavigate()

    const { data: dataBest, isLoading: isLoadingBest, isError: isErrorBest, error: errorBest } = useQuery({
        queryKey: ['books', 'best'],
        queryFn: ({ signal }) => fetchBestBooks({ signal }),
    })

    const { data: dataNewest, isLoading: isLoadingNewest, isError: isErrorNewest, error: errorNewest } = useQuery({
        queryKey: ['books', 'newest'],
        queryFn: ({ signal }) => fetchNewestBooks({ signal }),
    })

    const { data: dataGenres, isLoading: isLoadingGenres, isError: isErrorGenres, error: errorGenres } = useQuery({
        queryKey: ['genres'],
        queryFn: ({ signal }) => fetchGenres({ signal }),
    })

    const handleSearch = event => {
        event.preventDefault()

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        navigate(`/browse?search=${data.search}`)
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
            <Uncover 
                title='Uncover Hidden Gems' 
                handleSearch={handleSearch} 
                data={dataGenres} 
                isLoading={isLoadingGenres} 
                isError={isErrorGenres} 
                error={errorGenres} 
            />
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