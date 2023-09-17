import React from 'react'
import { getCategories, getCategoryPosts } from '@/services'

import { Categories, PostCard } from '@/components'


const CategoryDetails = ({ posts }) => {
    return (
        <div className='container mx-auto px-10 mb-8'>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                <div className='col-span-1 lg:col-span-8'>
                    {posts.map((post) => (<PostCard post={post.node} key={post.title} />))}
                </div>
                <div className='col-span-1 lg:col-span-4'>
                    <div className='relative lg:stikcy'>
                        <Categories />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CategoryDetails

// Fetch data at build time
export async function getStaticProps({ params }) {
    const posts = await getCategoryPosts(params.slug);
    return {
        props: { posts },
    };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
    const categories = await getCategories();
    return {
        paths: categories.map(({ slug }) => ({ params: { slug } })),
        fallback: false,
    };
}