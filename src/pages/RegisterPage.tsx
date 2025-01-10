import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Logo from '../resources/logo.png';

import Alert from '../utils/Alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk, faKey } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    avatar: `https://picsum.photos/800`
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create user');
            }

            const data = await response.json();
            console.log('User created successfully:', data);

            navigate('/login');
        } catch (error) {
            console.error('Error creating user:', error);
            setIsError('Email or Password Wrong');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className='w-full h-screen flex flex-row bg-[var(--color-tertiary)] mt-[36px]'>
            {
                isError && <Alert isError={isError} setIsError={setIsError}/>
            }
            <div className='w-[40%] h-full flex flex-col justify-center items-center gap-6 mx-auto'>
                <Link to='/'>
                    <img src={Logo} alt='Everdeen Shop' className='mx-auto h-[72px] w-auto cursor-pointer transition-all ease-in-out duration-300 hover:scale-110' />
                </Link>
                <div className='w-full'>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <label htmlFor='name' className='flex flex-row items-center gap-2 text-[var(--color-primary)]'>
                            <FontAwesomeIcon icon={faUser} className='w-[12px] h-[12px]' />
                            <p className='font-semibold'>Name</p>
                        </label>
                        <input id='name' name='name' type='name' required placeholder='Full Name'
                            className='w-full rounded-full p-4 bg-white border-2 border-slate-950 placeholder:text-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-slate-950'
                            onChange={(event) => setName(event.target.value)} />
                        <label htmlFor='email' className='flex flex-row items-center gap-2 text-[var(--color-primary)]'>
                            <FontAwesomeIcon icon={faMailBulk} className='w-[12px] h-[12px]' />
                            <p className='font-semibold'>Email Address</p>
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
                                <p className='font-semibold'>Sign Up</p>
                            }
                        </button>
                    </form>
                </div>
                <p className='text-center text-[var(--color-primary)]'>Have an Account? {' '}<Link to='/login' className='font-semibold text-[var(--color-primary)] hover:underline hover:underline-offset-2 '>Sign In</Link></p>
            </div>
        </section>
    )
}

export default RegisterPage;