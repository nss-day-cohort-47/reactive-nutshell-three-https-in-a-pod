// Ethan Mathis -- fetch calls relating to messages
const url = "http://localhost:8088"

export const getAllMessages = () => {
    return fetch(`${url}/messages`)
    .then(response => response.json())
}

export const deleteMessage = (id) => {
    return fetch(`${url}/messages/${id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}