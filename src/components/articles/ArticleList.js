//Hunter Preast-- Display list of articles
import React, { useEffect, useState } from "react"
import { deleteArticle, getUserArticles } from "../../modules/articleManager";
import { ArticleCard } from "./ArticleCards"


export const ArticleList = () => {
    const [articles, setArticles] = useState([]);

    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    const getCurrentArticle = () => {
        return getUserArticles(loggedInUser)
            .then(articlesFromAPI => {
                setArticles(articlesFromAPI)
            })
    }

    const handleDeleteArticle = (articleId) => {
        deleteArticle(articleId).then(() => 
        getCurrentArticle()
        )
    }

    useEffect(() => {
        getCurrentArticle()
    }, [])

    return (
        <section className="articleList">
            <div className="articleCards">
                {articles.map(article => 
                    <ArticleCard 
                    key={article.id}
                    article={article}
                    handleDeleteArticle={handleDeleteArticle}
                    />
                )}
            </div>
        </section>
    )
}