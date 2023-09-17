import React from 'react'
import Author from '../components'
import { getAuthors } from '../services'
import Image from 'next/image';

const about = ({ authors }) => {
    return (

        <div className='container mx-auto px-10 mb-8'>
            <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
                <div>
                    <h1 className="mt-4 mb-4 text-xl font-bold">Welcome to The Wandering Coder!</h1>
                    <h3 className="mt-4 mb-4 text-xl">
                        👋 Hello and a big, hearty welcome to all our amazing readers! We&apos;re thrilled you&apos;ve decided to join us on this exciting journey through the worlds of travel, self-improvement, web development, and lifestyle.

                    </h3>
                    <h3 className="mt-4 mb-4 text-xl">
                        🌍 Why &apos;The Wandering Coder&apos;?
                        We believe life is a tapestry of experiences—some technological, some personal, and some that make you want to pack a bag and explore the world. So, why limit ourselves to just one aspect? Here, we wander through various facets of life, from the intricate details of coding to the broad, beautiful landscapes of our world.
                    </h3>
                    <br />
                </div>
                {authors.map((author) =>

                    <div key={author.name}>

                        <div>
                            <Image
                                unoptimized="true"
                                alt={author.name}
                                width={100}
                                height={100}
                                className="align-middle rounded-full userimage"
                                src={author.photo.url}
                            />
                        </div>
                        <h3 className="mt-4 mb-4 text-xl font-bold">{author.name}</h3>
                        <p className="text-ls">{author.bio}</p>
                        <br />
                    </div>
                )}

            </div>

        </div >


    )
}

export default about

export async function getStaticProps() {
    const authors = (await getAuthors()) || [];

    return {
        props: { authors }
    }

}