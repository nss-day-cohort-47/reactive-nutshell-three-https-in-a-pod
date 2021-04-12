// Hunter Preast, Ethan Mathis, Logan Demmy-- Fetch calls for friends tab

const url = "http://localhost:8088"

export const getUserFriends = (id) => {
    return fetch (`${url}/friends?currentUserId=${id}&_expand=user`)
    .then(response => response.json())
}

export const addFriend = (friendObj) => {
    return fetch(`${url}/friends`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(friendObj)
    })
    .then(response => response.json())
}

export const deleteFriend = (friendId) => {
    return fetch(`${url}/friends/${friendId}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}