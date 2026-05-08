import { useState } from "react";
import hero_image from '../assets/images/hero/main.png'


function Home() {
    return (
        <>
            <section
                className="hero flex flex-row-reverse p-10 items-stretch bg-base-200 min-h-[calc(100vh-100px)]"
            >
                <div className="image rounded-4xl my-auto h-140 max-h-150 basis-1/2 bg-[url(./assets/images/hero/family.jpg)] bg-cover bg-no-repeat bg-left"></div>

                <div
                    className="content basis-1/2 flex flex-col gap-4 justify-center"
                >

                    <h1
                        className="text-6xl font-bold text-secondary"
                    >Sugu.com</h1>
                    <h2>Tout vos produits preferés disponibles depuis le salon. <br /> Avec Sugu.com, plus de panique, plus fatigue, tout est livré à domicile.</h2>
                </div>
            </section>

            <section className="trendings py-30 px-10">
                <div className="section-heading flex flex-col items-center">
                    <h2
                        className="text-2xl text-secondary uppercase text-sm font-bold tracking-[1px]"
                    >Tendances</h2>
                    <p
                        className="text-3xl font-bold text-base-content color-accent italic max-w-150 text-center"
                    >Decouvrez les produits en vogues de vos créateurs preferés</p>
                </div>

                <div className="product-wrapper mt-35 flex gap-6">
                    <div 
                        className="card flex-1/3 max-w-100 bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-6 rounded-5xl overflow-hidden"
                    >
                        <img
                            className="max-w-full h-70 object-cover object-center" 
                            src="images/products/bidon_tour_afrique_2.jpg" 
                            alt="" 
                        />

                        <div 
                            className="content p-5 flex flex-col gap-3 items-left"
                        >
                            <h2 className="name font-bold text-md">Bidon tour d'afrique</h2>
                            <p className="description text-sm font-medium lg:block md:hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea alias ad laboriosam?</p>
                            <button className="btn btn-primary self-end">Achéter</button>
                        </div>
                    </div>
                    <div 
                        className="card flex-1/3 max-w-100 bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-6 rounded-5xl overflow-hidden"
                    >
                        <img
                            className="max-w-full h-70 object-cover object-center" 
                            src="images/products/bidon_tour_afrique_2.jpg" 
                            alt="" 
                        />

                        <div 
                            className="content p-5 flex flex-col gap-3 items-left"
                        >
                            <h2 className="name font-bold text-md">Bidon tour d'afrique</h2>
                            <p className="description text-sm font-medium lg:block md:hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea alias ad laboriosam?</p>
                            <button className="btn btn-primary self-end">Achéter</button>
                        </div>
                    </div>
                    <div 
                        className="card flex-1/3 max-w-100 bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-6 rounded-5xl overflow-hidden"
                    >
                        <img
                            className="max-w-full h-70 object-cover object-center" 
                            src="images/products/bidon_tour_afrique_2.jpg" 
                            alt="" 
                        />

                        <div 
                            className="content p-5 flex flex-col gap-3 items-left"
                        >
                            <h2 className="name font-bold text-md">Bidon tour d'afrique</h2>
                            <p className="description text-sm font-medium lg:block md:hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea alias ad laboriosam?</p>
                            <button className="btn btn-primary self-end">Achéter</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact py-30 px-10 bg-base-200">
                <div className="section-heading flex flex-col items-center">
                    <h2
                        className="text-2xl text-secondary uppercase text-sm font-bold tracking-[1px]"
                    >Contact</h2>
                    <p
                        className="text-3xl font-bold text-base-content color-accent italic max-w-150 text-center"
                    >Contactez nous dès aujourd'hui pour commencer à béneficier de nos services</p>
                </div>

                <form action="" className="contact w-full max-w-150 shadow-lg rounded-2xl p-5 mt-35 mx-auto flex flex-col gap-6 items-center w-fit">
                    <div className="top flex gap-4 w-full">
                        <input 
                            type="text" 
                            className="input"
                            placeholder="Votre nom complet"
                        />

                        <input 
                            type="email" 
                            name="" 
                            id="" 
                            className="input" 
                            placeholder="Votre adresse email"
                        />
                    </div>

                    <textarea 
                        name="" 
                        id=""
                        className="textarea w-full"
                        placeholder="Votre message"
                    ></textarea>

                    <button type="submit" className="btn btn-secondary">Envoyer</button>
                </form>
            </section>
        </>
    )
}


export default Home;