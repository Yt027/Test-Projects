import { ShoppingCartIcon } from "lucide-react"

function Card() {
    return (
        <div className="product_card w-70 flex flex-col bg-gray-100 rounded-2xl">
            <img src="/products/test.png" alt="" />

            <button 
                className="cart-btn btn btn-sm btn-error rounded-2xl"
                type="button"
            >
                <ShoppingCartIcon className="w-4 h-4" />
            </button>

            <h3 
                className="font-bold text-md p-3 pb-0"
            >Air Jordan</h3>

            <div 
                className="cta flex items-center gap-3 justify-between p-3 pt-0"
            >
                <span className="text-sm">18.000F</span>
                <button 
                    className="btn btn-primary btn-md rounded-2xl"
                    type="button">
                Consulter</button>
            </div>
        </div>
    )
}

export default Card