//Hunter Preast, Ethan Mathis, Logan Demmy-- Fetch calls relating to articles
const url = "http://localhost:8088"

export const getUserArticles = (id) => {
    return fetch(`${url}/articles?currentUserId${id}&_expand=user`)
    .then(response => response.json())
}

export const addArticle = (article) => {
    return fetch(`${url}/articles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(article)
    })
    .then(response => response.json())
}

export const deleteArticle = (articleId) => {
    return fetch(`${url}/articles/${articleId}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}