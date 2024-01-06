import PropTypes from 'prop-types';

export default function ErrorBlock({ title = 'An error occured.', message }) {
  return (
    <div className="bg-[#f0d9e5] rounded text-[#890b35] flex gap-8 items-center text-left mx-0 my-4 p-4">
      <div className="text-[2rem] w-12 h-12 text-white bg-[#890b35] flex flex-shrink-0 justify-center items-center rounded-[50%]">!</div>
      <div>
        <h2 className='text-inherit text-xl m-0'>{title}</h2>
        <div className='m-0'>{message}</div>
      </div>
    </div>
  );
}

ErrorBlock.propTypes = {
  title: PropTypes.string,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
}