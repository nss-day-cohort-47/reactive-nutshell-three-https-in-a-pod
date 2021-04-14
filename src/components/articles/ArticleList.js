//Hunter Preast-- Display list of articles
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router";
import { deleteArticle, getUserArticles } from "../../modules/articleManager";
import { getUserFriends } from "../../modules/friendsListManager";
import { ArticleCard } from "./ArticleCards"


export const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [friendArticles, setFriendArticles] =useState([]);

    const history = useHistory();

    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))


    const getCurrentArticle = () => {
        return getUserArticles(loggedInUser)
            .then(articlesFromAPI => {
                setArticles(articlesFromAPI)
            })
    }

    const getFriendArticles = () => {
        getUserFriends(loggedInUser)
        .then(result => {
            const friends = result
            const friendId = friends.map((elem) => elem.user.id)
            // console.log(friendId)
            getUserArticles(friendId)
            .then(friendArticlesFromAPI => {
                console.log(friendArticlesFromAPI)
                setFriendArticles(friendArticlesFromAPI)
            })
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

    useEffect(() => {
        getFriendArticles()
    }, [])

    function biggestToSmallest(a, b) {
        return b.timestamp - a.timestamp;
    }
    articles.sort(biggestToSmallest);

    return (
        <section className="articleList">
            <button type="button" className="btn"
            onClick={() => {history.push("/articles/create")}}>
                Add Article
            </button>
            <div className="articleCards">
                {articles.map(article => 
                    <ArticleCard 
                    key={article.id}
                    article={article}
                    handleDeleteArticle={handleDeleteArticle}
                    />
                )}
            </div>
            <div className="articleCards">
                {friendArticles.map(article => 
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