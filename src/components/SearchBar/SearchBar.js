
import "./SearchBar.css"

function SearchBar({ sendSearchQuery, handleSearchTerm }) {
    return (
        <>
            <form onSubmit={sendSearchQuery} className="SearchBar">
                <input
                    onChange={(event) => handleSearchTerm(event.target.value)}
                    type="text"
                    required 
                    className="SearchBarInput"
                    id="search-query"
                    placeholder="Enter A Song, Album, or Artist"></input>
                <input
                    type="submit"
                    className="SearchButton"
                    id="search"
                    value="SEARCH"></input>
            </form>
        </>
    )
}

export default SearchBar;