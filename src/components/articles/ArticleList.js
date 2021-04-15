//Hunter Preast-- Display list of articles
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router";
import { deleteArticle, getUserArticles } from "../../modules/articleManager";
import { getUserFriends } from "../../modules/friendsListManager";
import { ArticleCard } from "./ArticleCards"
import "./ArticleList.css"


export const ArticleList = () => {
    const [articles, setArticles] = useState([]);
   

    const history = useHistory();

    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    const getCurrentArticle = () => {
        let userFriendArticles = [];
        return getUserFriends(loggedInUser)
            .then(result => {
                
                result.forEach(friend => {

                    getUserArticles(friend.user.id)
                        .then(articleArray => {
                            userFriendArticles = userFriendArticles.concat(articleArray)
                            // console.log(userFriendArticles)
                        })
                        .then(() => getUserArticles(loggedInUser)
                            .then(article => {

                                let allArticles = []
                                allArticles = userFriendArticles.concat(article)
                                setArticles(allArticles)
                            })
                        )
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

    
    function biggestToSmallest(a, b) {
        return b.timestamp - a.timestamp;
    }
    articles.sort(biggestToSmallest);

    return (
        <section className="articleList">
            <button type="button" className="btn"
                onClick={() => { history.push("/articles/create") }}>
                Add Article
            </button>
            <div className="articleCards">
                {articles.map(article =>
                    <ArticleCard
                        key={article.id}
                        article={article}
                        handleDeleteArticle={handleDeleteArticle}
                        loggedInUser={loggedInUser}
                    />
                )}
            </div>
        </section>
    )
}