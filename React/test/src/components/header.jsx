import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Header() {
    const navigate = useNavigate()
    return (
        <header
            className="bg-base-200 rounded-2xl h-[90px] mb-[10px] flex flex-raw justify-between items-center py-2 px-10 bg-base-400"
        >
            <div
                className="logo btn btn-secondary rounded-full"
                onClick={() => navigate('/')}
            >
                Sugu
            </div>

            <nav
                className="flex justify-between items-center gap-3"
            >
                <NavLink
                    to="/"
                    className="item link link-secondary"
                >Accueil</NavLink>

                <NavLink
                    to="/shop"
                    className="item link link-secondary"
                >Boutique</NavLink>

                <NavLink
                    to="/cart"
                    className="item link link-secondary"
                >Panier</NavLink>

                <NavLink
                    to="/contact"
                    className="item link link-secondary"
                >Contact</NavLink>

                <NavLink
                    to="/about"
                    className="item link link-secondary"
                >A propos</NavLink>
            </nav>
        </header>
    )
}

export default Header