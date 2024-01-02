import PropTypes from 'prop-types';
import Input from "./Input";

export default function SearchForm({ handleSearch }) {
    return (
        <form onSubmit={handleSearch}>
            <Input addClassName="mb-4 text-xs h-9" placeholder="Search..." type='text' name='search' />
        </form>
    )
}

SearchForm.propTypes = {
    handleSearch: PropTypes.func,
}