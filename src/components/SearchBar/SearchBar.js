
import "./SearchBar.css"

function SearchBar({sendSearchQuery, handleSearchTerm}) {
    return (
        <>
            <div className="SearchBar">
                <input onChange={(event) => handleSearchTerm(event.target.value)} type="text" id="search-query" placeholder="Enter A Song, Album, or Artist"></input>
                <button onClick={sendSearchQuery} className="SearchButton" id="search">SEARCH</button>
            </div>
        </>
    )
}

export default SearchBar;