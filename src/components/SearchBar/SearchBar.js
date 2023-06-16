import testButton from "../../util/spotify";
import "./SearchBar.css"

function SearchBar({handleSearchTerm}) {
    return (
        <>
            <div className="SearchBar">
                <input onChange={(event) => handleSearchTerm(event.target.value)} type="text" id="search-query" placeholder="Enter A Song, Album, or Artist"></input>
                <button onClick={testButton} className="SearchButton" id="search">SEARCH</button>
            </div>
        </>
    )
}

export default SearchBar;