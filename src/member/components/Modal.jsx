import { any } from 'prop-types';
import { useEffect } from 'react';
import ReactModal from 'react-modal';

export default function Modal({ children, ...attributes }) {
  useEffect(() => {
    ReactModal.setAppElement('body');
  }, [])

  return <ReactModal
    className="bg-white p-8 flex flex-col items-center justify-center rounded-xl fixed md:left-[calc(50%_-_20rem)] w-full md:w-[40rem] max-h-[80vh] z-10 shadow-lg mx-auto md:m-0 border-none top-[10vh]"
    {...attributes}
  >
    {children}
  </ReactModal>
}

Modal.propTypes = {
  children: any,
}