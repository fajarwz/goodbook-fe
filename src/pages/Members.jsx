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

function Members() {
  const [initialPage, setInitialPage] = useState(0);
  const [page, setPage] = useState(1);

  const handlePageClick = ({ selected }) => {
    setInitialPage(selected)
    setPage(selected + 1)
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', { page }],
    queryFn: ({ signal, queryKey }) => fetchMembers({ signal, ...queryKey[1] }),
  })

  let content = <p>No data found.</p>

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

    const body = (
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
    <AdminCardTable title={'Members'}>
      {content}
    </AdminCardTable>
  )
}

export default Members