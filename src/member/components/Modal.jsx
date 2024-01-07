import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close();
    };
  }, []);

  return createPortal(
    <dialog ref={dialog} onClose={onClose} className="bg-white p-8 flex flex-col items-center justify-center rounded-xl fixed md:left-[calc(50%_-_20rem)] w-full md:w-[40rem] max-h-[80vh] z-10 shadow-lg mx-auto md:m-0 border-none top-[10vh] backdrop:h-screen backdrop:w-full backdrop:fixed backdrop:left-0 backdrop:top-0" >
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
