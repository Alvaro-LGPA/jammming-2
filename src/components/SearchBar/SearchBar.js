import "./SearchBar.css"

function SearchBar() {
    return (
        <>
            <div className="SearchBar">
                <input type="text" placeholder="Enter A Song, Album, or Artist"></input>
                <button className="SearchButton">SEARCH</button>
            </div>
        </>
    )
}

export default SearchBar;