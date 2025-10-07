import { useState } from "react"
import { MenuIcon, ShoppingCart } from "lucide-react"


function Header() {    
    return (
        <header className="header flex items-center justify-between gap-4 bg-gray-100 text-white-100 p-4">
            <a><span className="logo text-lg font-bold">Sugu</span></a>

            <ul className="links flex items-center gap-4">
                <li className="btn btn-inactive">Shop</li>
                <li className="btn btn-primary">About</li>
                <li className="btn btn-primary">Contact</li>
            </ul>

            <div className="cta flex items-center gap-2">
                <div className="btn btn-sm btn-error">
                    <ShoppingCart className="w-4 h-4" />
                </div>
                <div className="btn btn-sm btn-soft">
                    <MenuIcon className="w-4 h-4" />
                </div>
            </div>
        </header>
    )
}

export default Header