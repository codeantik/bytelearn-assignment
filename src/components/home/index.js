import './styles.css';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineLike, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import BlogContext from '../../utils/contexts/blogContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([]);
    const { blogs, setBlogs, persistBlogs } = useContext(BlogContext);
    const navigate = useNavigate();

    


    const handleLikes = (id) => {
        setBlogs((prevBlogs) =>
            prevBlogs.map((blog) => 
                blog.id === id ?
                { ...blog, likes: blog.likes + 1 } :
                blog
            )
        );

        persistBlogs();
    }

    const handleDelete = (id) => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        persistBlogs();
    }

    useEffect(() => {
        
    }, []);

    return (
        <div className="home">
            <h1>Blogs</h1>
            {blogs.length > 0 ? (
                <div className='card-container'>
                    {blogs.map((blog, index) => (
                        <div className='blog-card' key={blog.id}>
                            <div className="blog-item">
                                <h3>{blog.title}</h3>
                                <p>{blog.content}</p>
                                <img src={blog.image} alt={blog.title} />
                                <p>{blog.postTime}</p>
                                <p>{blog.likes}</p>
                            
                                <div className="blog-card-footer">
                                    <div onClick={() => handleLikes(blog.id)}>
                                        <AiOutlineLike />
                                    </div>
                                    <div onClick={() => navigate('/add', { state: { from: '/edit', blog }})}>
                                        <AiOutlineEdit />
                                    </div>
                                    <div onClick={() => handleDelete(blog.id)}>
                                        <AiOutlineDelete />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h1>No data</h1>
            )}
        </div>
    );
}

export default Home;