import React from 'react'
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface HomePageProps {
    title: string;
    description: string;
    button: string;
    navigation: string;
}

const HomePage: React.FC<HomePageProps> = ({ title, description, button, navigation }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex flex-col gap-12 my-[100px] md:my-[200px]">
            <section className='w-full h-fit md:h-[20vh] flex flex-col md:relative bg-white'>
                <div className='w-[80%] h-full mx-auto'>
                    <div className='w-full flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-around'>
                        <h1 className='text-5xl text-left leading-tight font-semibold text-stone-900'>{title}</h1>
                        <div className='flex flex-col gap-6'>
                            <p className='text-[16px] text-left font-normal text-stone-900 text-balance'>{description}</p>
                            <button onClick={() => navigate(navigation)} className='w-fit h-auto flex items-center justify-center gap-2 border border-stone-900 bg-white text-stone-900 rounded-full pt-[8px] pb-[10px] px-[20px] group'>
                                <p className='font-semibold transform ease-in-out duration-300 transition-all group-hover:mr-8 '>{button}</p>
                                <FontAwesomeIcon icon={faArrowRight} className='w-[12px] h-[12px] text-[var(--color-primary)]' />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage