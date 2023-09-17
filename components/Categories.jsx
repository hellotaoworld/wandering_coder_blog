import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCategories } from '../services'

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then((newCategories) => {
            setCategories(newCategories);
        })
    }, []);

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                Categories
            </h3>
            {categories.map((category, index) => (

                <Link href={`/category/${category.slug}`} className="text-md" key={index}>
                    <span className='transition duration-500 ease inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full cursor-pointer hover:bg-pink-300 mb-3 mr-2'> {category.name}</span>
                </Link>
            ))}
        </div>
    )
}

export default Categories