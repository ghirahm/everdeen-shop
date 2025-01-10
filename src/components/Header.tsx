import React from 'react';

import Logo from '../resources/logo.png';

import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC =() => {

    const navigate = useNavigate();

    const isAuthenticated = !!localStorage.getItem('access_token');

    const handleSignOut = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    return (
        <header className='w-full'>
            <nav className='w-full h-[100px] fixed top-0 flex justify-between items-center bg-white px-20 z-20'>
                <ul className='flex w-fit h-full items-center gap-[40px] text-[16px] font-normal'>
                    <Link to='/'>
                        <img src={Logo} alt='Everdeen Shop' className='w-auto h-[30px] cursor-pointer transition-all ease-in-out duration-300 hover:scale-110' />
                    </Link>
                    <li className='hover:-translate-y-1 ease-in-out duration-300'>
                        <Link to='/' >Home</Link>
                    </li>
                    <li className='hover:-translate-y-1 ease-in-out duration-300'>
                        <Link to='/product' >Products</Link>
                    </li>
                </ul>
                <ul className='flex w-fit h-full items-center gap-[20px] text-[16px] font-normal'>
                {isAuthenticated ? (
                        <li>
                            <button
                                onClick={handleSignOut}
                                className="relative w-fit flex items-center justify-center border border-[var(--color-primary)] bg-[var(--color-tertiary)] text-[var(--color-primary)] rounded-full pt-[8px] pb-[10px] px-[20px] overflow-hidden ease-in-out duration-300 hover:text-[var(--color-secondary)] hover:-translate-y-1 before:absolute before:h-0 before:w-0 before:rounded-full before:bg-[var(--color-primary)] before:duration-500 before:ease-out hover:before:h-56 hover:before:w-56"
                            >
                                <p className="z-10">Sign Out</p>
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to="/login"
                                    className="relative w-fit flex items-center justify-center border border-[var(--color-primary)] bg-[var(--color-tertiary)] text-[var(--color-primary)] rounded-full pt-[8px] pb-[10px] px-[20px] overflow-hidden ease-in-out duration-300 hover:text-[var(--color-secondary)] hover:-translate-y-1 before:absolute before:h-0 before:w-0 before:rounded-full before:bg-[var(--color-primary)] before:duration-500 before:ease-out hover:before:h-56 hover:before:w-56"
                                >
                                    <p className="z-10">Sign In</p>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/register"
                                    className="relative w-fit flex items-center justify-center bg-[var(--color-primary)] text-[var(--color-secondary)] rounded-full pt-[8px] pb-[10px] px-[20px] overflow-hidden ease-in-out duration-300 hover:text-[var(--color-primary)] hover:-translate-y-1 before:absolute before:h-0 before:w-0 before:rounded-full before:bg-[var(--color-accent)] before:duration-500 before:ease-out hover:before:h-56 hover:before:w-56"
                                >
                                    <p className="z-10">Sign Up</p>
                                </Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link to='/cart' className='relative w-fit flex items-center justify-center bg-[var(--color-primary)] text-[var(--color-secondary)] rounded-full pt-[8px] pb-[10px] px-[20px] overflow-hidden ease-in-out duration-300 hover:text-[var(--color-primary)] hover:-translate-y-1 before:absolute before:h-0 before:w-0 before:rounded-full before:bg-[var(--color-accent)] before:duration-500 before:ease-out hover:before:h-56 hover:before:w-56'>
                            <p className='z-10'>Cart</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;