import SearchButton from "../SearchButton/SearchButton";

function SearchBar(){
return(
    <>
    <form>
        <input type="text" name="searchField"></input>
        <SearchButton />
    </form>
    </>
)
}

export default SearchBar;