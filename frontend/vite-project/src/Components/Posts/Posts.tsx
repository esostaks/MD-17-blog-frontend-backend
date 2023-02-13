import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from 'axios'
import AddForm from "../AddForm/AddForm";
import style from '../Posts/Posts.module.scss'


export type PostCards = {
    id?: number,
    title: string,
    content: string,
    image: string,
}

const getAllPosts = async () => {
    const { data } = await axios.get('http://localhost:3004/posts')
    return data
}

const makeExcerpt = (string: string) => {
    return string.split(' ').slice(0, 10).join(' ') + '...'
}

export const AllPosts = () => {
    const { data, isLoading } = useQuery<PostCards[]>(['allposts'], getAllPosts)

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (!data) {
        return <h1>Something went wrong...</h1>
    }

    console.log(data)


    return (
        <div className={style.mainSection}>
            <div className={style.cardContainer}>
            {data.map(({id, title, content, image}) => (
                <div className={style.card} key={id}>
                    <div className={style.imgSide}>
                        <img src={image} width='300' height='300'></img>
                    </div>
                    <div className={style.textSide}>
                        <h3 className={style.title}>{title}</h3>
                        <p className="text">{makeExcerpt(content)}</p>
                        <Link to={`/posts/${id}`}>  
                            <span className={style.readMore}>Read more</span>
                        </Link>  
                    </div>
                </div>
                   
            )
                
            )}
            </div>
            <AddForm />
        </div>   
    )
    
}

export default AllPosts