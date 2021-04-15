// Hunter Preast-- function to display articles edit form
import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getArticleById, updateArticle } from "../../modules/articleManager"

export const ArticleEdit = () => {
    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const {articleId} = useParams()
    const history = useHistory()

    const handleControlledInputChange = (event) => {
        const newArticle = { ...article }
        let selectedValue = event.target.value
        
        newArticle[event.target.id] = selectedValue
        
        setArticle(newArticle)
    }

    const handleUpdateArticle = (event) => {
        event.preventDefault();
        setIsLoading(true)

        const updatedArticle = {
            id: articleId,
            userId: article.userId,
            title: article.title,
            synopsis: article.synopsis,
            url: article.url,
            timestamp: article.timestamp

        }
        updateArticle(updatedArticle)
        .then(() => history.push("/"))
    }

    useEffect(() => {
        getArticleById(articleId)
        .then(article => {
            setArticle(article)
            setIsLoading(false)
        })
    }, [])

    return (
        <form>
            <fieldset>
                <div className="articleTitle">
                    <label htmlFor="articleTitle">Title: </label>
                    <input type="text"
                           id="title"
                           onChange={handleControlledInputChange}
                           autoFocus required
                           className="articleForm"
                           value={article.title} />
                </div>
                <div className="article">
                    <label htmlFor="synopsis">Synopsis: </label>
                    <input type="text"
                           id="synopsis"
                           onChange={handleControlledInputChange}
                           autoFocus required
                           className="articleForm"
                           value={article.synopsis} />
                </div>
                <div className="url">
                    <label htmlFor="url">URL: </label>
                    <input type="text"
                           id="url"
                           required
                           onChange={handleControlledInputChange}
                           className="articleForm" 
                           value={article.url} />
                </div>
            </fieldset>
            <button className="btn btn-primary"
                    onClick={handleUpdateArticle}
                    disabled={isLoading}>
                        Update Article
                    </button>
        </form>
    )
}
