import PropTypes from 'prop-types';

import alertDanger from '../../member/assets/img/alert-danger.svg'

export default function ErrorBlock({ title = 'An error occured.', message }) {
  return (
    <div className="bg-[#F0D9E5] rounded text-[#D83333] flex gap-8 items-center text-left mx-0 my-4 p-4">
      <img src={alertDanger} alt="Danger alert icon" />
      <div>
        <h2 className='text-inherit text-xl m-0'>{title}</h2>
        <div className='m-0'>
          {typeof message === 'string' ? (
            message
          ) : (
            <ul>
              {
                Object.entries(message).map(([key, message]) => (
                  <li className='list-disc' key={key}>{message}</li>
                ))
              }
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

ErrorBlock.propTypes = {
  title: PropTypes.string,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
}