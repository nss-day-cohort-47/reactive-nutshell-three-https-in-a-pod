// Ethan Mathis -- Fetch calls realating to tasks

const url = "http://localhost:8088"

export const getTasksById = (userId) => {
    return fetch(`${url}/tasks?userId=${userId}&_expand=user`)
    .then(response => response.json())
}

export const deleteTask = (userId) => {
    return fetch(`${url}/tasks/${userId}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}

export const addTask = (taskObj) => {
    return fetch(`${url}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskObj)
    })
    .then(response => response.json())
}

export const updateTask = (taskObj) => {
    return fetch(`${url}/tasks/${taskObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskObj)
    }).then(response => response.json())
}