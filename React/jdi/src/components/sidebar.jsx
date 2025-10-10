import { History, CalendarCheck, LayoutDashboard, Menu, X, ChartNoAxesColumn, User2, Link2 } from "lucide-react"
import { useState } from "react"

function Sidebar({ onSwitch }) {
    const [deployed, Deploy] = useState(false)
    return (
        <aside className={`sidebar flex flex-col gap-4 items-end z-10000 p-2 pt-5 bg-base-200 w-15 transition-all duration-300 ${deployed ? "w-50": ""}`}>
            <h2 className="logo bg-primary text-md/1 font-black italic text-white p-2 pt-1 flex items-center justify-center rounded-xl"
            >JDI</h2>

            <button 
                type="button" 
                className="switch btn btn-soft btn-sm"
                onClick={() => Deploy(!deployed)}
            >
                <Menu className={`w-4 h-4 ${deployed ? "hidden" : ""}`} />
                <X className={`w-4 h-4 ${deployed ? "" : "hidden"}`} />
            </button>

            <ul className="links flex flex-col gap-3 pt-12 h-full">
                <li 
                    className="item btn btn-soft btn-sm justify-end gap-2"
                    onClick={() => onSwitch("home")}
                >
                    <span className={!deployed ? "hidden" : ""}
                    >Accueil</span>
                    <LayoutDashboard className="w-4 h-4" />
                </li>

                <li 
                    className="item btn btn-soft btn-sm justify-end gap-2"
                    onClick={() => onSwitch("todo")}
                >
                    <span className={!deployed ? "hidden" : ""}
                    >Tâches du jour</span>
                    <CalendarCheck className="w-4 h-4" />
                </li>

                <li 
                    className="item btn btn-soft btn-sm justify-end gap-2"
                    onClick={() => onSwitch("historic")}
                >
                    <span className={!deployed ? "hidden" : ""}
                    >Historique</span>
                    <History className="w-4 h-4" />
                </li>

                <li 
                    className="item btn btn-soft btn-sm justify-end gap-2"
                    onClick={() => onSwitch("stats")}
                >
                    <span className={!deployed ? "hidden" : ""}
                    >Statistiques</span>
                    <ChartNoAxesColumn className="w-4 h-4" />
                </li>

                <li 
                    className="item btn btn-soft btn-sm justify-end gap-2 mt-auto self-end"
                    onClick={() => onSwitch("user")}
                >
                    <span className={!deployed ? "hidden" : ""}
                    >Mon compte</span>
                    <User2 className="w-4 h-4" />
                </li>

                <li 
                    className="item btn btn-soft btn-sm justify-end gap-2 self-end"
                    onClick={() => onSwitch("share")}
                >
                    <span className={!deployed ? "hidden" : ""}
                    >Partager</span>
                    <Link2 className="w-4 h-4" />
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar