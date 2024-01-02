import { Footer } from '../components'
import { Header, Ignite, Promotion, Uncover } from '../features/home'
import config from '../utils/config'
import { useTitle } from '../../common/hooks'
import { useQuery } from '@tanstack/react-query'
import { fetchBestBooks } from '../api/books'
import Card from '../features/home/Card'

export default function Home() {
    useTitle('Home | ' + config.app.name)

    const { data: dataBest, isLoading: isLoadingBest, isError: isErrorBest, error: errorBest } = useQuery({
        queryKey: ['books', 'best'],
        queryFn: ({ signal }) => fetchBestBooks({ signal }),
    })

    let highestRatings = <></>
    if (dataBest) {
        highestRatings = dataBest.map(book => {
            return <Card key={book.id} book={book} />
        })
    }

    const handleSearch = (event) => {

    }

    return (
        <>
            <Header />
            <Promotion 
                title="Highest Rating" 
                isLoading={isLoadingBest} 
                isError={isErrorBest} 
                error={errorBest} 
            >
                {highestRatings}
            </Promotion>
            <Uncover handleSearch={handleSearch} genres={[]} />
            <Promotion title="New Releases" books={[]} />
            <Ignite />
            <Footer />
        </>
    )
}