import './styles.css';
import React, { useState, useContext, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import BlogContext from '../../utils/contexts/blogContext';
import { useLocation } from 'react-router-dom';


const schema = yup.object().shape({
    // title: yup.string().required('Title is required'),
    // name: yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
    // email: yup.string().email('Invalid email address').required('Email is required'),
    // contactNumber: yup.string()
    // .matches(/^[0-9]{10}$/, 'Contact Number must be 10 digits')
    // .required('Contact Number is required'),
    // courseLevel: yup.object().shape({
    //     value: yup.string().required('courseLevel is required'),
    //     label: yup.string().required('courseLevel is required (from label)')
    // })
    // .nullable()
    // .required("courseLevel is required (from outer null check)"),
    // countryPreferences: yup.array()
    // .min(1, 'You must select at least one country')
    // .of(
    //     yup.object().shape({
    //         value: yup.string().required('countryPreferences is required'),
    //         label: yup.string().required('countryPreferences is required (from label)')
    //     })
    // )
    // .nullable()
    // .required("countryPreferences is required (from outer null check)"),
    // dateOfBirth: yup.date(),
    title: yup.string().min(5, 'Title must be at least 5 characters').required('Title is required'),
    content: yup.string().min(10, 'Content must be at least 10 characters').required('Content is required'),
    image: yup.string().url('Invalid URL').default('https://via.placeholder.com/150'),
    // id: yup.string().default(uuidv4()),
    // postTime: yup.string().default(new Date().toLocaleString()),
});

const Form = ({ }) => {

    const location = useLocation()

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema)
    });

    const { setBlogs, persistBlogs } = useContext(BlogContext);

    const submitForm = (data) => {
        toast.success('New blog added successfully!');
        setBlogs((prevBlogs) => [...prevBlogs, data]);
        persistBlogs();
    }

    useEffect(() => {
        console.log(location)
    }, [])

    return (
        <div className="form-container">
            <div className="form">
                <div className="form-header">
                    <h2>{location.state?.from === '/edit' ? 'Edit ' : 'Add New '} Blog</h2>
                </div>
                <form className="form-body" onSubmit={handleSubmit(submitForm)}>
                    <input
                        type="text"
                        value={location.state?.blog ? location.state.blog.id: uuidv4()}
                        disabled
                    />
                    <input
                        type="text"
                        value={location.state?.blog ? location.state.blog.postTime: `${new Date().toLocaleString()}`}
                        disabled
                    />
                    <input 
                        placeholder='Enter title..'
                        {...register("title")}
                    />
                    {errors.title && <p className="error">{errors.title.message}</p>}
                    <input
                        placeholder='Enter content..'
                        {...register("content")}
                    />
                    {errors.content && <p className="error">{errors.content.message}</p>}
                    <input
                        placeholder='Enter Image..'
                        {...register("contactNumber")}
                    />
                    {errors.image && <p className="error">{errors.image.message}</p>}
                    
                    <div className="form-footer">
                        <input
                            className='submit-btn'
                            type="submit"
                            placeholder='Add'
                        />
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Form;