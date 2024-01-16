import { useEffect } from "react";
import { useDeleteMyReview } from "../../../hooks/useMy";
import { Modal } from "../../../components";
import { ErrorBlock } from "../../../../common/components";
import { PrimaryButton, SecondaryButton } from "../../../components/Button";
import { bool, func, object } from "prop-types";

export default function ContentModaldelete({ isDeleting, deleteForm, handleCloseDeleteModal }) {
    const handleDeleteReview = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        let { id } = Object.fromEntries(formData);

        mutate({ id })
    }

    const {
        mutate,
        isPending,
        isError,
        error,
        isSuccess,
    } = useDeleteMyReview()

    useEffect(() => {
        if (isSuccess) {
            handleCloseDeleteModal()
        }
    }, [isSuccess, handleCloseDeleteModal])


    const handleCancelDelete = () => {
        handleCloseDeleteModal()
    }

    let modalNotif = <></>
    if (isError) {
        if (error instanceof Error) {
            modalNotif = <div className='w-full'>
                <ErrorBlock title={error.message} message='' />
            </div>
        }
        else {
            modalNotif = <div className='w-full'>
                <ErrorBlock title='' message={error} />
            </div>
        }
    }

    return <Modal isOpen={isDeleting}>
        <h3 className="mb-4">Are you sure?</h3>
        <form onSubmit={handleDeleteReview} className='w-full'>
            <div className='mb-8'>
                {modalNotif}
                <div className='text-center'>You want to delete your &ldquo;{deleteForm.name}&rdquo; review?</div>
                <input type="hidden" name='id' defaultValue={deleteForm.id} />
            </div>
            <div className='text-center flex flex-col md:flex-row justify-center'>
                <PrimaryButton type='submit' addClassName={`px-7 md:mr-2 mb-2 md:mb-0 ${isPending ? 'disabled' : ''}`}>{isPending ? 'Deleting...' : 'Delete Review'}</PrimaryButton>
                <SecondaryButton type='button' addClassName='w-full md:w-28' onClick={handleCancelDelete}>Cancel</SecondaryButton>
            </div>
        </form>
    </Modal>
}

ContentModaldelete.propTypes = {
    isDeleting: bool,
    deleteForm: object,
    handleCloseDeleteModal: func,
}