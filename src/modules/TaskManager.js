// Ethan Mathis -- Fetch calls realating to tasks

const url = "http://localhost:8088"

export const getTasksById = (userId) => {
    return fetch(`${url}/tasks/${userId}`)
    .then(response => response.json())
}

export const deleteTask = (userId) => {
    return fetch(`${url}/tasks/${userId}`, {
        method: "DELETE"
    }).then(response => response.json())
}