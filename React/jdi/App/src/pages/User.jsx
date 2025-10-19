import { UserRoundIcon } from "lucide-react"
import { useState } from "react"

function User() {
    const [input, setInput] = useState("")
    const [username, setUsername] = useState(localStorage.getItem("username") || "")

    function changeUsername() {
        setUsername(input.trim())
        localStorage.setItem("username", input.trim())
        setInput("")
    }

    return (
        <section className="self-center bg-base-300 rounded-2xl p-5 flex flex-col items-center gap-6">
            <div className="icon flex items-center justify-center w-20 h-20 bg-base-100 rounded-[50%] overflow-hidden">
                <UserRoundIcon className="w-12 h-12" />
            </div>

            <div className="flex gap-3 justify-center">
                <input 
                    className="name input"
                    placeholder="Votre nom"
                    type="text" 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    name="" 
                    id="" 
                />

                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={changeUsername}
                >Valider</button>
            </div>
        </section>
    )
}

export default User