import { useQuery } from "@tanstack/react-query"
import { fetchMembers } from "../utils/http/admin/members"
import LoadingIndicator from "../components/LoadingIndicator"
import ErrorBlock from "../components/ErrorBlock"
import Table from "../components/Table/Table"
import AdminCardTable from "../components/Card/AdminCardTable"
import Th from "../components/Table/Th"
import Td from "../components/Table/Td"
import ReactPaginate from 'react-paginate'; 
import { useState } from "react"
import useTitle from "../hooks/useTitle"
import Input from "../components/Form/Input"

function Members() {
  useTitle('Members | ' + import.meta.env.VITE_ADMIN_APP_NAME)

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
    queryKey: ['users', { search }, { page }],
    queryFn: ({ signal, queryKey }) => fetchMembers({ signal, ...queryKey[1], ...queryKey[2] }),
  })

  const attribute = (
    <form onSubmit={handleSearch}>
      <Input addClassName="mb-4 text-xs h-9" placeholder="Search..." type='text' name='search' />
    </form>
  )

  let content = ''

  if (isLoading) {
    content = <div className="text-center">
      <LoadingIndicator />
    </div>
  }

  if (isError) {
    content = <ErrorBlock 
      title = "An error occured"
      message={error.info?.message || 'Failed to fetch data'}
    />
  }

  if (data) {
    const headNames = [
      'Image',
      'Name',
      'Email',
      'Created At',
      'Updated At',
    ]
    const head = (
      <Th headNames={headNames} />
    )

    const body = data.data.length === 0 ? <tr><td className="text-center" colSpan={5}>No data found.</td></tr> : (
      data.data.map(user => (
        <tr key={user.id}>
          <Td value={
            <img src={user.image} alt={user.name} className="rounded-full w-10 h-10"/>
          } />
          <Td value={user.name} />
          <Td value={user.email} />
          <Td value={user.created_at} />
          <Td value={user.updated_at} />
        </tr>
      ))
    )

    content = (
      <>
        <Table head={head} body={body} />
        <ReactPaginate
          initialPage={initialPage}
          activeClassName={'items-center text-orange-default cursor-pointer flex text-sm justify-center'}
          breakClassName={'items-center cursor-pointer flex text-sm justify-center'}
          breakLabel={'...'}
          containerClassName={'items-center flex flex-row justify-center list-none'}
          disabledClassName={'text-gray-default'}
          marginPagesDisplayed={2}
          nextClassName={"items-center text-black-default cursor-pointer flex p-3 text-sm justify-center"}
          nextLabel="next&nbsp;>"
          onPageChange={handlePageClick}
          pageCount={data.meta.last_page}
          pageClassName={'items-center text-black-default cursor-pointer flex text-sm justify-center font-bold'}
          pageLinkClassName={'p-3'}
          pageRangeDisplayed={2}
          previousClassName={"items-center text-black-default cursor-pointer flex p-3 text-sm justify-center"}
          previousLabel="<&nbsp;prev"
          renderOnZeroPageCount={null}
        />
      </>
    )
  }

  return (
    <AdminCardTable title={'Members'} attribute={attribute}>
      {content}
    </AdminCardTable>
  )
}

export default Members