import { useEffect, useState } from 'react'
import Header from "./components/header"
import Sidebar from "./components/sidebar"
import SearchBox from "./components/search_box"
import Card from "./components/product_card"
import react from "./assets/react.svg"

function Shop() {
    const [searchInput, setSearchInput] = useState("")
    return (
        <>
            <Header />

            <Sidebar />

            <div className="hero flex flex-col p-3">
                <SearchBox input={searchInput} setInput={setSearchInput}  />
            </div>

            <div
                className="products flex flex-wrap gap-4 justify-center p-3"
            >
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </>
    )
}

export default Shop