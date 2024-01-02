import { useQuery } from "@tanstack/react-query"
import { fetchBooks } from "../utils/http/admin/books"
import AdminTableCard from "../components/Card/AdminTableCard"
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
      'Created At',
      'Updated At',
    ]
    head = (
      <Th headNames={headNames} />
    )

    body = data.data.length === 0 ? <tr><Td addClassName="text-center" colSpan={9}>No data found.</Td></tr> : (
      data.data.map(book => (
        <tr key={book.id}>
          <Td><img src={book.cover} alt={book.title} width={50} /></Td>
          <Td>{book.title}</Td>
          <Td addClassName='min-w-48'>{book.short_description}</Td>
          <Td>{book.author.name}</Td>
          <Td>{book.number_of_pages}</Td>
          <Td>{book.cover_type.name}</Td>
          <Td>{book.avg_rating}</Td>
          <Td>{book.rater_count}</Td>
          <Td>{book.published_at}</Td>
          <Td>{book.created_at}</Td>
          <Td>{book.updated_at}</Td>
        </tr>
      ))
    )

    pageCount = data.meta.last_page
  }

  return (
    <AdminTableCard
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