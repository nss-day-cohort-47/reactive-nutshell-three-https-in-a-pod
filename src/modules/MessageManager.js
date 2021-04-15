// Ethan Mathis -- fetch calls relating to messages
const url = "http://localhost:8088"

export const getAllMessages = () => {
    return fetch(`${url}/messages?_expand=user`)
    .then(response => response.json())
}

export const deleteMessage = (id) => {
    return fetch(`${url}/messages/${id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}

export const addMessage = (newMessage) => {
    return fetch(`${url}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMessage)
    })
    .then(response => response.json())
}