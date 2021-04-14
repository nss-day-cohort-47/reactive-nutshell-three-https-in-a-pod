// Ethan Mathis -- purpose = to fetch the loggedInUser tasks and return them as a list of TaskCards

import React, { useEffect, useState } from 'react'
import { deleteTask, getTasksById } from "../../modules/TaskManager"
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
        return getTasksById(loggedInUser)
        .then(userTasks => {
            setTasks(userTasks)
        })
    }

    const handleDelete = (id) => {
        deleteTask(id).then(() => 
        getLoggedTasks()
        )
    }

    // const handleAddTask = () => {}

    

    useEffect(() => {
        getLoggedTasks()
    }, [])

    return (
        <section className="taskList">
            <button type="button" 
                    onClick={() => history.push("/tasks/create")}>
                        Add New Task</button>
            <div className="taskCard">
                {tasks.map(task => 
                    <TaskCard 
                    key={task.id}
                    task={task}
                    handleDelete={handleDelete} />)}
            </div>
        </section>
    )
}