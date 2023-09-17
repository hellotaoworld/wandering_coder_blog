import React from 'react';
import Image from 'next/image';


const Author = ({ author }) => (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-sky-600 bg-opacity-50">
        <div className="absolute align-middle -top-14">
            <Image
                unoptimized="true"
                alt={author.name}
                width={100}
                height={100}
                className="align-middle rounded-full userimage"
                src={author.photo.url}
            />
        </div>
        <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
        <p className="text-white text-ls">{author.bio}</p>
    </div>
);

export default Author;