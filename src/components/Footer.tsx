import React from 'react';

import Logo from '../resources/logo.png';

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-200">
            <div className="mx-auto p-12">
                <div className="flex items-center justify-center md:justify-between">
                    <a href=' ' className="flex items-center" >
                        <img src={Logo} className="h-8 mr-3" alt="Everdeen Shop" />
                        <h1 className="self-center whitespace-nowrap text-xl font-normal">
                            Everdeen Shop
                        </h1>
                    </a>
                    <ul className="hidden md:flex md:flex-wrap md:items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href=' ' className="hover:underline mr-6 ">
                                Products
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/6281807362365" className="hover:underline">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 mx-auto" />
                <span className="block text-[0.6rem] md:text-sm text-gray-500 text-center">
                    Everdeen Shop from <span className="font-bold">Platzi Fake Store</span>
                </span>
            </div>
        </footer>
    )
}

export default Footer;