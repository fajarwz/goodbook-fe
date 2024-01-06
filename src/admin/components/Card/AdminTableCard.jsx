import PropTypes from 'prop-types';
import { ErrorBlock, LoadingIndicator } from "../../../common/components"
import Table from '../Table/Table';
import ReactPaginate from 'react-paginate';
import Card from './Card';

export default function AdminTableCard({ title, attribute, isLoading, isError, error, head, body, initialPage, handlePageClick, pageCount }) {
    let content = <></>

    if (isLoading) {
        content = <div className="text-center">
            <LoadingIndicator />
        </div>
    }

    if (isError) {
        content = <ErrorBlock title={error.message} message='' />
    }

    if (head && body) {
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
                    pageCount={pageCount}
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
        <Card>
            <h1 className="text-2xl mb-2">{title}</h1>
            {attribute}
            {content}
        </Card>
    )
}

AdminTableCard.propTypes = {
    title: PropTypes.string.isRequired,
    attribute: PropTypes.object,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    error: PropTypes.object,
    head: PropTypes.object,
    body: PropTypes.array,
    initialPage: PropTypes.number.isRequired,
    handlePageClick: PropTypes.func.isRequired,
    pageCount: PropTypes.number,
}