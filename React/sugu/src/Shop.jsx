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

            <div 
                className="hero z-1 w-full h-70 
                    bg-[url(/hero.jpg)] 
                    bg-cover flex items-end 
                    justify-center p-1 pb-3 mb-10"
            >
                <div className="hero flex flex-col p-3">
                    <SearchBox className="z-10" input={searchInput} setInput={setSearchInput}  />
                </div>
            </div>

            <Sidebar />

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