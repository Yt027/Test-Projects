import { useState } from "react"
import { ShoppingCart, User2 } from "lucide-react"


function Header() {    
    return (
        <header className="header text-white-100 p-4">
            <div className="flex items-center justify-between gap-4 max-w-200 m-auto">
                <a><span className="logo text-lg font-bold text-gray-100 text-shadow-md">Sugu</span></a>

                {/* <ul className="links flex items-center gap-4">
                    <li className="btn btn-inactive">Shop</li>
                    <li className="btn btn-primary">About</li>
                    <li className="btn btn-primary">Contact</li>
                </ul> */}

                <div className="cta flex items-center gap-2">
                    <div className="btn btn-sm btn-error">
                        <ShoppingCart className="w-4 h-4" />
                    </div>
                    <div className="btn btn-sm btn-soft">
                        <User2 className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header