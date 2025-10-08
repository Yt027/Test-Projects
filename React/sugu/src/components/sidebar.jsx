import { useState } from "react"
import { ArrowLeft, LayoutDashboard, PhoneCall, ShoppingCartIcon, Users2 } from "lucide-react"

function Sidebar() {
    const [deployed, Deploy] = useState(false)

    function switchSidebar() {
        const newstate = deployed ? false : true;
        Deploy(newstate)
    }

    return (
        <aside 
            className={`sidebar flex gap-5 flex-col items-end bg-gray-100 p-6 pt-5 rounded-2xl w-20 transition-all duration-300 ease-in-out ${deployed ? "w-40" : ""}`}
        >
            <div className="logo flex items-center justify-center rounded-md font-black bg-gray-600 text-white w-7 h-7">S</div>

            <div 
                className={`switch w-8 h-8 bg-gray-300 hover:bg-gray-200 cursor-pointer flex items-center justify-center rounded-2xl transition-all duration-300 ${deployed ? "rotate-180" : ""}`}
                onClick={switchSidebar}
            >
                <ArrowLeft className="w-4 h-4" />
            </div>

            <ul 
                className="links flex flex-col gap-2 items-end mt-3"
            >
                <li 
                    className="item group cursor-pointer flex items-center gap-3"
                >
                    <span className={`text-gray-700 text-sm font-bold group-hover:text-primary ${!deployed ? "hidden" : ""}`}>Home</span>
                    <div 
                        className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded group-hover:bg-primary"
                    >
                        <LayoutDashboard className="w-4 h-4 group-hover:text-white" />
                    </div>
                </li>
                <li 
                    className="item group cursor-pointer flex items-center gap-3"
                >
                    <span className={`text-gray-700 text-sm font-bold group-hover:text-primary ${!deployed ? "hidden" : ""}`}>Boutique</span>
                    <div 
                        className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded group-hover:bg-primary"
                    >
                        <ShoppingCartIcon className="w-4 h-4 group-hover:text-white" />
                    </div>
                </li>
                <li 
                    className="item group cursor-pointer flex items-center gap-3"
                >
                    <span className={`text-gray-700 text-sm font-bold group-hover:text-primary ${!deployed ? "hidden" : ""}`}>Contact</span>
                    <div 
                        className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded group-hover:bg-primary"
                    >
                        <PhoneCall className="w-4 h-4 group-hover:text-white" />
                    </div>
                </li>
                <li 
                    className="item group cursor-pointer flex items-center gap-3"
                >
                    <span className={`text-gray-700 text-sm font-bold group-hover:text-primary ${!deployed ? "hidden" : ""}`}>A propos</span>
                    <div 
                        className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded group-hover:bg-primary"
                    >
                        <Users2 className="w-4 h-4 group-hover:text-white" />
                    </div>
                </li>
            </ul>
        </aside>
    )
}


export default Sidebar