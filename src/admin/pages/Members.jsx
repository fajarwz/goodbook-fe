import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import config from "../utils/config"

import { fetchMembers } from "../api/members"
import { useTitle } from '../../common/hooks'

import { AdminTableCard } from "../components/Card"
import { Tr, Th, Td } from "../components/Table"
import { Input } from "../components/Form"

function Members() {
  useTitle('Members | ' + config.app.name)

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
    queryKey: ['members', { search }, { page }],
    queryFn: ({ signal, queryKey }) => fetchMembers({ signal, ...queryKey[1], ...queryKey[2] }),
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
      'Image',
      'Name',
      'Email',
      'Created At',
      'Updated At',
    ]
    head = (
      <Th headNames={headNames} />
    )

    body = data.data.length === 0 ? <Tr><Td addClassName="text-center" colSpan={5}>No data found.</Td></Tr> : (
      data.data.map(user => (
        <Tr key={user.id}>
          <Td><img src={user.image} alt={user.name} className="rounded-full w-10 h-10" /></Td>
          <Td>{user.name}</Td>
          <Td>{user.email}</Td>
          <Td>{user.created_at}</Td>
          <Td>{user.updated_at}</Td>
        </Tr>
      ))
    )

    pageCount = data.meta.last_page
  }

  return (
    <AdminTableCard
      title={'Members'}
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

export default Members