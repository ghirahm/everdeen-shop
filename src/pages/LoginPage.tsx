import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Logo from '../resources/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk, faKey } from '@fortawesome/free-solid-svg-icons';

import Alert from '../utils/Alert';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            // Send the login request
            const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Error response:', errorResponse);
                throw new Error(`Login failed: ${errorResponse.message || 'Unknown error'}`);
            }

            const data = await response.json();
            console.log('Login successful:', data);

            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);

            navigate('/product');
        } catch (error) {
            console.error('Error during login:', error);
            setIsError('Invalid Email or Password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='w-full my-[150px]'>
             {
                isError && <Alert isError={isError} setIsError={setIsError}/>
            }
            <div className='w-[40%] h-full flex flex-col justify-center items-center gap-6 mx-auto'>
                <Link to='/'>
                    <img src={Logo} alt='Everdeen Shop' className='mx-auto h-[72px] w-auto cursor-pointer transition-all ease-in-out duration-300 hover:scale-110' />
                </Link>
                <div className='w-full'>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <label htmlFor='email' className='flex flex-row items-center gap-2 text-[var(--color-primary)]'>
                            <FontAwesomeIcon icon={faMailBulk} className='w-[12px] h-[12px]' />
                            <p className='font-semibold'>Email Address or Username</p>
                        </label>
                        <input id='email' name='email' type='email' required autoComplete='email' placeholder='Email'
                            className='w-full rounded-full p-4 bg-white border-2 border-slate-950 placeholder:text-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-slate-950'
                            onChange={(event) => setEmail(event.target.value)} />

                        <label htmlFor='password' className='flex flex-row items-center gap-2 text-[var(--color-primary)]'>
                            <FontAwesomeIcon icon={faKey} className='w-[12px] h-[12px]' />
                            <p className='font-semibold'>Password</p>
                        </label>
                        <input id='password' name='password' type='password' required autoComplete='current-password' placeholder='Password'
                            className='w-full rounded-full p-4 bg-white border-2 border-slate-950 placeholder:text-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-slate-950'
                            onChange={(event) => setPassword(event.target.value)} />

                        <button type='submit' className='flex w-full justify-center items-center rounded-full font-semibold bg-white border-2 border-slate-950 text-[var(--color-secondary)] p-4 ease-in-out duration-300 hover:border-b-8 hover:border-[#ffaad1]'>
                        {isLoading ?
                                <>
                                    <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-[var(--color-secondary)]' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                    </svg>
                                    <p>Loading</p>
                                </> :
                                <p className='font-semibold'>Sign In</p>
                            }
                        </button>
                    </form>
                </div>
                <p className='text-center text-[var(--color-primary)]'>Not a Member? {' '}<Link to='/register' className='font-semibold text-[var(--color-primary)] hover:underline hover:underline-offset-2 '>Sign Up</Link></p>
            </div>
        </section>
    )
}

export default LoginPage;