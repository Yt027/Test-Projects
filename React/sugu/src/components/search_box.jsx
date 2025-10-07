import { useState } from "react"
import { Search } from "lucide-react"

function SearchBox({ input, setInput }) {
    return (
        <div className="search_box flex gap-3 bg-gray-100 p-1.5 rounded-3xl">
            <input 
                className="input rounded-3xl bg-transparent border-0 outline-0"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Rechercher"
                type="search" 
                name="" 
                id="" 
            />

            <div className="btn btn-primary btn-md rounded-3xl">
                <Search className="w-4 h-4" />
            </div>
        </div>
    )
}

export default SearchBox