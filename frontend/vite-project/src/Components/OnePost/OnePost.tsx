import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PostCards } from "../Posts/Posts";
import React, { useState } from 'react'
import axios from 'axios'
import { AllPosts } from '../Posts/Posts'
import style from '../OnePost/OnePost.module.scss'


const getOnePost = async (id: string) => {
    const { data } = await axios.get(`http://localhost:3004/posts/${id}`)
    return data
}

const OnePost = () => {
    const [updateTitle, setUpdateTitle] = useState('')
    const [updateText, setUpdateText] = useState('')
    const [updateImage, setUpdateImage] = useState('')
    const [showEdit, setShowEdit] = useState(true)

    const onEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setShowEdit(false)
    }

    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isLoading } = useQuery<PostCards>(['onePost'], () => getOnePost(id!))

    
    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!data) {
        navigate('/')

        return null
    }

    const {title, content, image} = data

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setShowEdit(true)
        axios.put(`http://localhost:3004/posts/${id}`, {
          title: updateTitle,
          content: updateText,
          image: updateImage
        }).then(({ data }) => {
            axios.get(`http://localhost:3004/posts/${id}`)
          });
    }


    return (
        <div className={style.container}>
            <img src={image} width='600' height='400'></img>
            <h1 className={style.title}>{title}</h1>
            <p className={style.text}>{content}</p>
            <button className={style.button} onClick={onEdit}>EDIT</button>
            <form onSubmit={onSubmit} className={`editHidden ${!showEdit && 'editActive'}`}>
                <label>
                    Image <br /> <br />
                    <input
                     className={style.field}
                     required
                     defaultValue={image}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdateImage(e.target.value)}
                     />
                </label>
                <label>
                    Title <br /><br />
                    <input
                    className={style.field}
                    required
                    defaultValue={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdateTitle(e.target.value)}/>
                </label>
                <label>
                    Text <br /><br />
                    <textarea
                    className={style.textarea}
                    required
                    defaultValue={content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUpdateText(e.target.value)}
                    >
                    </textarea>
                </label>
                <button className={style.button}>UPDATE</button>
            </form>   
        </div>
      
    );
  };
  

  export default OnePost