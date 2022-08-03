import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

import Header from './components/header';
import Home from './components/home';
import Form from './components/form';
// import Register from './components/register';
// import Login from './components/login';
// import Upload from './components/upload';
import BlogContext from './utils/contexts/blogContext';



const initialBlogs = [
  {
    id: '1',
    postTime: '2020-01-01',
    title: 'Blog Post 1',
    content: 'This is the first blog post',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    likes: 0,
  },
  {
    id: '2',
    postTime: '2020-01-01',
    title: 'Blog Post 1',
    content: 'This is the first blog post',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    likes: 0,
  }
]




function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [blogs, setBlogs] = useState(
    localStorage.getItem('blogs') ? JSON.parse(localStorage.getItem('blogs')) : []
  )
  // console.log(loggedIn);

  const persistBlogs = () => {    
    localStorage.clear();
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }

  // {
  //   _id: '1',
  //   postTime: '2020-01-01',
  //   title: 'Blog Post 1',
  //   content: 'This is the first blog post',
  //   image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  //   likes: 0,
  // },
  // {
  //   id: '2',
  //   postTime: '2020-01-01',
  //   title: 'Blog Post 1',
  //   content: 'This is the first blog post',
  //   image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  //   likes: 0,
  // }

  return (
    <div className="App">
      <Router>
        {/* {loggedIn && <Header setLoggedIn={setLoggedIn}/>} */}
        <Header />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
            />
        <BlogContext.Provider value={{ blogs, setBlogs, persistBlogs }}>
          <Routes>
            <Route path="/" element={<Home blogs={blogs} setBlogs={setBlogs} />} />
            <Route path="/add" element={<Form />} />
            {/* <Route path="/blogs/:id" element={<Blog />} /> */}
            {/* <Route 
              path="/" 
              element={loggedIn ? 
                <Home setLoggedIn={setLoggedIn} loggedIn={loggedIn} /> : 
                <Navigate to="/login" replace />
              }         
            />
            <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<Upload />} /> */}
            <Route path="*" element={<h1>404 Not Found!</h1>} />
          </Routes>
        </BlogContext.Provider>
      </Router>
    </div>
  );
}

export default App;