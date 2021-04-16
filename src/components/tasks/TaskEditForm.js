// Ethan Mathis -- purpose is to create a form to edit a tasks name, description or completion date

import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getTaskById, updateTask } from "../../modules/TaskManager"

export const TaskEditForm = () => {
    const [task, setTask] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    // const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    const {taskId} = useParams()
    const history = useHistory()

    const handleInputChange = event => {
        const newTask = {...task}
        newTask[event.target.id] = event.target.value;
        setTask(newTask) 
        console.log(newTask)
    }

    const handleUpdate = (event) => {
        event.preventDefault();
        setIsLoading(true)

        const editedTask = {
            id: taskId,
            userId: task.userId,
            title: task.title,
            task: task.task,
            completedby: task.completedby,
            isComplete: task.isComplete
        }
        updateTask(editedTask)
        .then(() => history.push("/tasks"))
    }

    useEffect(() => {
        getTaskById(taskId)
        .then(task => {
            setTask(task)
            setIsLoading(false)
        })
    }, [])

    return (
        <form>
            <fieldset>
                <h2>Edit Task</h2>
                <div className="formGroup">
                    <label htmlFor="taskTitle">Title: </label>
                    <input type="text"
                           id="title"
                           onChange={handleInputChange}
                           autoFocus required
                           className="form-control"
                           value={task.title} />
                </div>
                <div className="formGroup">
                    <label htmlFor="task">Task Description: </label>
                    <input type="text"
                           id="task"
                           onChange={handleInputChange}
                           autoFocus required
                           className="form-control"
                           value={task.task} />
                </div>
                <div className="formGroup">
                    <label htmlFor="completedby">Completion Date: </label>
                    <input type="date"
                           id="completedby"
                           required
                           onChange={handleInputChange}
                           className="form-control" 
                           value={task.completedby} />
                </div>
            </fieldset>
            <button className="article-btn"
                    onClick={handleUpdate}
                    disabled={isLoading}>
                        Update Task
                    </button>
        </form>
    )
}
