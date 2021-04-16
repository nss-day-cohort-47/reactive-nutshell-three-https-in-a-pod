//Hunter Preast-- Display form to post new articles
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router";
import { addArticle, getUserArticles } from "../../modules/articleManager";


export const ArticleForm = () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))
    const [article, setArticle] = useState({
        title: "",
        synopsis: "",
        url: "",
        timestamp: Date.now(),
        userId: loggedInUser
    });
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newArticle = { ...article }
        let selectedValue = event.target.value
        
        newArticle[event.target.id] = selectedValue
        
        setArticle(newArticle)
    }

    const handleSaveArticle = (event) => {
        event.preventDefault()
        

        if (article.title === "" || article.synopsis === "" || article.url === "") {
            window.alert("Please fill in all fields")
        } else {
            setIsLoading(true)
            addArticle(article)
            .then(() => history.push("/"))
            
        }
    }

    return (
        <form className="articleForm">
            <h2 className="articleFormTitle">New Article</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Title" value={article.title} />
                </div>
                <div className="form-group">
                    <label htmlFor="synopsis">Synopsis:</label>
                    <input type="text" id="synopsis" onChange={handleControlledInputChange} required className="form-control" placeholder="Synopsis" value={article.synopsis} />
                </div>
                <div className="form-group">
                    <label htmlFor="url">URL:</label>
                    <input type="text" id="url" onChange={handleControlledInputChange} required className="form-control" placeholder="URL" value={article.url} />
                </div>
                <button type="button" className="article-btn" onClick={handleSaveArticle} disabled={isLoading}>
                Save Article
                </button>
            </fieldset>
        </form>
    )
}