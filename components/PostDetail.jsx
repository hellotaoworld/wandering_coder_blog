import React from 'react'
import moment from 'moment'

const PostDetail = ({ post }) => {

    const getContentFragment = (index, text, obj, type) => {
        let modifiedText = text;

        if (obj) {
            if (obj.bold) {
                modifiedText = (<b key={index}>{text}</b>);
            }

            if (obj.italic) {
                modifiedText = (<em key={index}>{text}</em>);
            }

            if (obj.underline) {
                modifiedText = (<u key={index}>{text}</u>);
            }
        }

        switch (type) {
            case 'heading-one':
                return <h1 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h1>;
            case 'heading-two':
                return <h2 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h2>;
            case 'heading-three':
                return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
            case 'heading-four':
                return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
            case 'heading-five':
                return <h5 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h5>;
            case 'paragraph':
                return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
            case 'block-quote':
                return <blockquote key={index} className="mb-8 bg-gray-200 p-8 text-gray italic text-md">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</blockquote>;
            case 'code-block':
                return <div key={index} className="mb-4 bg-gray-200 p-8 text-gray-600 text-md border-l-4 border-pink-300">
                    <pre className='whitespace-pre-wrap '><code>
                        {modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}
                    </code></pre>
                </div>;
            case 'numbered-list':
                return <div key={index} >
                    <ol className="mb-4 text-md list-decimal ml-6">
                        {modifiedText.map((item, i) => (
                            <li key={i}><React.Fragment>{item}</React.Fragment></li>
                        )
                        )}
                    </ol></div>;
            case 'bulleted-list':
                return <div key={index} >
                    <ul className="mb-4 text-md list-disc ml-6">
                        {modifiedText.map((item, i) => (
                            <li key={i}><React.Fragment>{item}</React.Fragment></li>
                        )
                        )}
                    </ul></div>;
            case 'image':
                return (
                    <img
                        key={index}
                        alt={obj.title}
                        height={obj.height}
                        width={obj.width}
                        src={obj.src}
                        className='p-8'
                    />
                );
            default:
                return modifiedText;
        }
    };


    return (
        <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
            <div className="relative overflow-hidden shadow-md mb-6">
                <img src={post.featuredImage.url} alt="" className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
            </div>
            <div className="px-4 lg:px-0">
                <div className="flex items-center mb-2 w-full">
                    <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
                        <img
                            alt={post.author.name}
                            width={30}
                            className="align-middle rounded-full userimage"
                            src={post.author.photo.url}
                        />
                        <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.author.name}</p>
                    </div>
                    <div className="font-medium text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                    </div>

                </div>
                <div className='flex items-center mb-6 w-full'>
                    <div className="font-medium text-gray-700">
                        {post.categories.map((category, index) => {
                            return (
                                <p className="text-sm transition duration-500 ease inline-block bg-gray-200 text-lg text-gray-700 px-3 py-1 rounded-full mr-3" key={index}>
                                    {category.name}
                                </p>
                            )
                        })
                        }

                    </div>
                </div>

                <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
                {post.content.raw.children.map((typeObj, index) => {
                    // Outer loop on typeObj
                    //console.log(typeObj);

                    let children = typeObj.children.map((item, itemindex) => {
                        // inner loop
                        switch (typeObj.type) {
                            case 'bulleted-list':
                            case "numbered-list":
                                let s = [];
                                item.children[0].children.map((sentence, sentenceindex) => {
                                    s.push(sentence.text);
                                })
                                //console.log(s.join(''));
                                //console.log("case1");
                                return s.join('');
                            case "code-block":
                                //console.log(item.children[0]);
                                //console.log("case2");
                                return item.children[0].text;

                            default:
                                //console.log(item);
                                return item.text;

                        }
                    }
                    );

                    //console.log(children);
                    return getContentFragment(index, children, typeObj, typeObj.type);
                })}
            </div>
        </div>
    )
}

export default PostDetail