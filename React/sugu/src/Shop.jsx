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
                className="hero z-1 w-full h-100 
                    bg-[url(/hero.jpg)] 
                    bg-cover flex items-center 
                    justify-end p-1 pb-3 mb-10
                    flex flex-col gap-3"
            >
                <h1
                    className='italic text-5xl font-black text-white text-shadow-lg mb-3'
                >Tout pour bouger</h1>

                <SearchBox className="z-10" input={searchInput} setInput={setSearchInput}  />
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