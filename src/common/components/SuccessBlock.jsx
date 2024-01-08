import PropTypes from 'prop-types';

import alertDanger from '../../member/assets/img/alert-danger.svg'

export default function SuccessBlock({ title = 'Success.', message }) {
  return (
    <div className="bg-[#D3F4D4] rounded text-[#1BC15E] flex gap-8 items-center text-left mx-0 my-4 p-4">
      <img src={alertDanger} alt="Success alert icon" />
      <div>
        <h2 className='text-inherit text-xl m-0'>{title}</h2>
        <div className='m-0'>{message}</div>
      </div>
    </div>
  );
}

SuccessBlock.propTypes = {
  title: PropTypes.string,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
}