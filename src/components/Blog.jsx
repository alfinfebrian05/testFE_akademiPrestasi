import { useEffect, useState } from 'react'
import { getAllBlog } from "@/api"

const Blog = () => {
    const [blogs, setBlogs] = useState([])
    const [isFetched, setIsFetched] = useState(true);
    const [isReFetched, setIsReFetched] = useState(false);

    const fetchBlogs = async () => {
        try {
            const data = await getAllBlog()
            setBlogs(data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleRefetchBlog = () => {
        fetchBlogs()
        setIsReFetched(true)
    }

    useEffect(() => {
        const originalTitle = document.title
        document.title = 'Simple Blog With JSONPlaceholder'
        return () => {
            document.title = originalTitle
        }
    }, [])

    useEffect(() => {
        if (isFetched) {
            fetchBlogs()
        }
        
        if (isReFetched) {
            setTimeout(() => {
                setIsReFetched(false)
            }, 1000)
        }

        return () => {
            setIsFetched(false)
        }
    }, [isFetched, isReFetched])
    

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='text-white flex items-center'>Blog {isReFetched && <span className='text-lg font-medium mx-5 px-4 py-1 bg-teal-700 border-[3px] border-teal-300 rounded-lg text-white transition duration-300 ease-in-out delay-300'>Blog is Refetched!</span>}</h1>
                <button className='bg-white px-4 py-2 text-lg rounded-lg font-medium' onClick={handleRefetchBlog}>Refetch</button>
            </div>
            {blogs.map((blog, key) => (
                <div key={key}>
                    <div className='text-block text-sm font-normal my-7 px-7 bg-white p-5 rounded-xl space-y-4'>
                        <img src='https://via.placeholder.com/600/92c952' className='object-fill w-full h-[20rem] mt-2 mb-6 rounded-lg' />
                        <h1 className='text-xl font-bold'>
                            Blog Title : {blog.title}
                        </h1>
                        <div className='pb-2'>
                            <p>
                                Blog id : {blog.id}
                            </p>
                            <p>
                                Blog text : {blog.body}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
      </div>
    )
}

export default Blog