import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import config from "../utils/config"

import { fetchReviews } from "../api/reviews"
import { useTitle } from '../../common/hooks'

import { AdminTableCard } from "../components/Card"
import { Tr, Th, Td } from "../components/Table"
import { SearchForm } from "../components/Form"

function Reviews() {
  useTitle('Reviews | ' + config.app.name)

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
    queryKey: ['reviews', { search }, { page }],
    queryFn: ({ signal, queryKey }) => fetchReviews({ signal, ...queryKey[1], ...queryKey[2] }),
  })

  const attribute = <SearchForm handleSearch={handleSearch} />

  let head = null
  let body = null
  let pageCount = 1

  if (data) {
    const headNames = [
      'Rating',
      'Review',
      'Member',
      'Book',
      'Created At',
      'Updated At',
    ]
    head = (
      <Th headNames={headNames} />
    )

    body = data.data.length === 0 ? <Tr><Td addClassName="text-center" colSpan={6}>No data found.</Td></Tr> : (
      data.data.map(review => (
        <Tr key={review.id}>
          <Td><i className="fas fa-star text-sm text-orange-default"></i> {review.rating}</Td>
          <Td>{review.review}</Td>
          <Td>{review.user.name}</Td>
          <Td>{review.book.title}</Td>
          <Td>{review.created_at}</Td>
          <Td>{review.updated_at}</Td>
        </Tr>
      ))
    )

    pageCount = data.meta.last_page
  }

  return (
    <AdminTableCard
      title={'Reviews'}
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

export default Reviews