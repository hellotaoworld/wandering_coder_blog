import React, { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategories } from '@/services'

const Header = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((newCategories) => {
            setCategories(newCategories);
        })
    }, []);

    return (
        <div className='container px-10 py-8 pb-8 mb-8 sticky top-0 w-full z-50 bg-sky-600 max-w-full border-b border-blue-500'>
            <div className=''>
                <div>
                    <Link href="/">
                        <span className='mt-4 ml-4 cursor-pointer font-bold text-4xl text-white'>Graph CMS</span>
                    </Link>
                </div>
                <div className='hidden md:float-left md:contents'>
                    {categories.map((category) => (
                        <Link key={category.slug} href={'/category/${category.slug}'}>
                            <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default Header