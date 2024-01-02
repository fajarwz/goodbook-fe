import PropTypes from 'prop-types';

export default function Heading({ text }) {
    return <div className="text-center">{text}</div>;
}

Heading.propTypes = {
    text: PropTypes.string,
}