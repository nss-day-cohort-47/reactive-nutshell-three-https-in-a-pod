//Hunter Preast-- Create cards to display posted articles
import React from "react"
import { Link } from 'react-router-dom'
import "./Articles.css"

export const ArticleCard = ({article, handleDeleteArticle, loggedInUser}) => {
    
    
    return (
    <>    
        {loggedInUser === article.userId ?
        <>
        <article className="article-card">
        <h4>Posted by: {article.user.name}</h4>
        <article className="postedArticle">
            <h6>{article.title}</h6>
            <p>{article.synopsis}</p>
            <a href={article.url}>{article.url}</a>
            <Link to={`/articles/${article.id}/edit`}><button>Edit</button></Link>
            <button type="button" onClick={() => handleDeleteArticle(article.id)}>Delete</button>
        </article>
        </article>
        </> : <>
        <article className="friend-article-card">
        <h4>Posted by: {article.user.name}</h4>
        <article className="postedArticle">
            <h6>{article.title}</h6>
            <p>{article.synopsis}</p>
            <a href={article.url}>{article.url}</a>
            
        </article> 
        </article>
        </>
        }
    </>    
    )
}