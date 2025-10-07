import { useEffect, useState } from 'react'
import Header from "./components/header"
import SearchBox from "./components/search_box"
import react from "./assets/react.svg"

function Shop() {
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        console.log(searchInput);
        
    }, [searchInput])

    return (
        <>
            <Header />

            <div className="hero flex flex-col p-3">
                <SearchBox input={searchInput} setInput={setSearchInput}  />
            </div>
        </>
    )
}

export default Shop