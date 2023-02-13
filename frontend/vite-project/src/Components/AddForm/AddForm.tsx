import React, { useState } from 'react'
import axios from 'axios'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostCards } from '../Posts/Posts';
import { AllPosts } from '../Posts/Posts'
import style from '../AddForm/AddForm.module.scss'



const AddForm = () => {

    const addPost = (post: PostCards) => {
        return axios.post('http://localhost:3004/posts', post)
    }
    
    const addNewPost = () => {
        const QueryClient = useQueryClient()
        return useMutation(addPost, {
            onSuccess: () => {
                QueryClient.invalidateQueries(['AllPosts'])
            }
        })
    }
    
    const { mutate } = addNewPost()
    
    const onSubmit = () => {
        const post: PostCards = { title, content, image} 
        mutate(post)
    }

    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
  
    
    return (
        <div className={style.formWrapper}>
            <form className={style.formWrapper} onSubmit={onSubmit}>
                <label className="addImageLabel">
                    <br /> Image <br /> <br />
                    <input placeholder="https://california.com/original.jpg"
                    className={style.field}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.value)}/>
                </label>
                <label className="addTitleLabel">
                    <br /> Title <br /> <br />
                    <input placeholder="My Trip to California" 
                    className={style.field}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}/>
                </label>
                <label className="addTextLabel">
                    <br />Text <br /> <br />
                    <textarea placeholder="Last summer I decided to visit California..." 
                    className={style.textarea}
                    required
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}/>
                </label>
                <button className={style.button}>ADD</button>
            </form>
        </div>
      
    );
  };
  

  export default AddForm