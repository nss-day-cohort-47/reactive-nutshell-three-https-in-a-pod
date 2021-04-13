// Hunter Preast, Ethan Mathis, Logan Demmy-- Fetch calls realating to users


const url = "http://localhost:8088"

export const getAllUsers = () => {
    return fetch(`${url}/users`)
    .then(response => response.json())
}