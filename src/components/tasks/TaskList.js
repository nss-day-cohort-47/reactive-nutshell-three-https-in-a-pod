// Ethan Mathis -- purpose = to fetch the loggedInUser tasks and return them as a list of TaskCards

import React, { useEffect, useState } from 'react'
import { deleteTask, getTasksByUser, updateTask } from "../../modules/TaskManager"
import { TaskCard } from "./TaskCard"
import { useHistory } from "react-router-dom"

export const TaskList = () => {
    // sets the initial state of the list of tasks to be displayed
    const [tasks, setTasks] = useState([]);

    const history = useHistory()

    // gets the Id of the currently logged in user
    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    // returns an array of the currently logged in user's tasks
    const getLoggedTasks = () => {
        return getTasksByUser(loggedInUser)
        .then(userTasks => {
            // filter through all of the users tasks and find the ones whose isComplete === false and setTasks to only those
        let unfinished = userTasks.filter(task => task.isComplete === false)
        setTasks(unfinished)
    })
}

    // handler for deleting unwanted tasks
    const handleDelete = (id) => {
        deleteTask(id).then(() => 
        getLoggedTasks()
        )
    }

    // this is for the checkbox. when the checkbox is clicked, it makes a copy of that task and sets isComplete = true.
    // it then passes the new object into the updateTask function which makes a PUT request to json server.
    // finally it calls getLoggedTasks again to render the page with the updated data
    const handleUpdate = (task) => {
        let completedTask = {...task}
        const newTask = {
            id: completedTask.id,
            userId: loggedInUser,
            title: completedTask.title,
            task: completedTask.task,
            completedby: completedTask.completedby,
            isComplete: true
        }
        console.log(newTask)
        updateTask(newTask)
        .then(() => getLoggedTasks())
    }
    

    useEffect(() => {
        getLoggedTasks()
    }, [])

    return (
        <section className="taskList">
            <button type="button" className="btn"
                    onClick={() => history.push("/tasks/create")}>
                        Add New Task</button>
            <div className="taskCard">
                <h3>To Do List</h3>
                {tasks.map(task => 
                    <TaskCard 
                    key={task.id}
                    task={task}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                     />)}
            </div>
        </section>
    )
}