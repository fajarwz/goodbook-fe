import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import config from "../utils/config"

import { fetchBooks } from "../api/books"
import { useTitle } from '../../common/hooks'

import { AdminTableCard } from "../components/Card"
import { Tr, Th, Td } from "../components/Table"
import { SearchForm } from "../components/Form"

function Books() {
  useTitle('Books | ' + config.app.name)

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

  const attribute = <SearchForm handleSearch={handleSearch} />

  let head = null
  let body = null
  let pageCount = 1

  if (data) {
    const headNames = [
      'Cover',
      'Title',
      'Short Description',
      'Avg. Rating',
      'Rater Count',
      'Author',
      'Pages',
      'Cover Type',
      'Published At',
      'Created At',
      'Updated At',
    ]
    head = (
      <Th headNames={headNames} />
    )

    body = data.data.length === 0 ? <Tr><Td addClassName="text-center" colSpan={9}>No data found.</Td></Tr> : (
      data.data.map(book => (
        <Tr key={book.id}>
          <Td><img src={book.cover} alt={book.title} width={50} /></Td>
          <Td>{book.title}</Td>
          <Td addClassName='min-w-48'>{book.short_description}</Td>
          <Td><i className="fas fa-star text-sm text-orange-default"></i> {book.avg_rating}</Td>
          <Td>{book.rater_count}</Td>
          <Td>{book.author.name}</Td>
          <Td>{book.number_of_pages}</Td>
          <Td>{book.cover_type.name}</Td>
          <Td>{book.published_at}</Td>
          <Td>{book.created_at}</Td>
          <Td>{book.updated_at}</Td>
        </Tr>
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