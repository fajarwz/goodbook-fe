import { useQuery } from "@tanstack/react-query"
import { fetchBooks } from "../utils/http/admin/books"
import AdminCardTable from "../components/Card/AdminCardTable"
import Th from "../components/Table/Th"
import Td from "../components/Table/Td"
import { useState } from "react"
import useTitle from "../hooks/useTitle"
import Input from "../components/Form/Input"

function Books() {
  useTitle('Books | ' + import.meta.env.VITE_ADMIN_APP_NAME)

  const [initialPage, setInitialPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setSearch(data.search)
  }

  const handlePageClick = ({ selected }) => {
    setInitialPage(selected)
    setPage(selected + 1)
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['books', { search }, { page }],
    queryFn: ({ signal, queryKey }) => fetchBooks({ signal, ...queryKey[1], ...queryKey[2] }),
  })

  const attribute = (
    <form onSubmit={handleSearch}>
      <Input addClassName="mb-4 text-xs h-9" placeholder="Search..." type='text' name='search' />
    </form>
  )

  let head = null
  let body = null
  let pageCount = 1

  if (data) {
    const headNames = [
      'Cover',
      'Title',
      'Short Description',
      'Author',
      'Pages',
      'Cover Type',
      'Avg. Rating',
      'Rater Count',
      'Published At',
    ]
    head = (
      <Th headNames={headNames} />
    )

    body = data.data.length === 0 ? <tr><td className="text-center" colSpan={9}>No data found.</td></tr> : (
      data.data.map(book => (
        <tr key={book.id}>
          <Td value={
            <img src={book.cover} alt={book.title} width={50} />
          } />
          <Td value={book.title} />
          <Td value={book.short_description} addClassName='min-w-48' />
          <Td value={book.author.name} />
          <Td value={book.number_of_pages} />
          <Td value={book.cover_type.name} />
          <Td value={book.avg_rating} />
          <Td value={book.rater_count} />
          <Td value={book.published_at} />
        </tr>
      ))
    )

    pageCount = data.meta.last_page
  }

  return (
    <AdminCardTable 
      title={'Books'} 
      isLoading={isLoading} 
      isError={isError} 
      error={error} 
      attribute={attribute}
      head={head}
      body={body}
      initialPage={initialPage}
      handlePageClick={handlePageClick}
      pageCount={pageCount}
    />
  )
}

export default Books