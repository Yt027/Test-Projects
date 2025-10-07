import { useEffect, useState } from 'react'
import Header from "./components/header"
import SearchBox from "./components/search_box"
import Card from "./components/product_card"
import react from "./assets/react.svg"

function Shop() {
    const [searchInput, setSearchInput] = useState("")
    return (
        <>
            <Header />

            <div className="hero flex flex-col p-3">
                <SearchBox input={searchInput} setInput={setSearchInput}  />
            </div>

            <Card />
        </>
    )
}

export default Shop