import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getTasksById, updateTask } from "../../modules/TaskManager"

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
        getTasksById(taskId)
        .then(task => {
            setTask(task)
            setIsLoading(false)
        })
    }, [])

    return (
        <form>
            <fieldset>
                <div className="taskTitle">
                    <label htmlFor="taskTitle">Title: </label>
                    <input type="text"
                           id="title"
                           onChange={handleInputChange}
                           autoFocus required
                           className="taskForm"
                           value={task.title} />
                </div>
                <div className="task">
                    <label htmlFor="task">Task Description: </label>
                    <input type="text"
                           id="task"
                           onChange={handleInputChange}
                           autoFocus required
                           className="taskForm"
                           value={task.task} />
                </div>
                <div className="completedby">
                    <label htmlFor="completedby">Completion Date: </label>
                    <input type="date"
                           id="completedby"
                           required
                           onChange={handleInputChange}
                           className="taskForm" 
                           value={task.completedby} />
                </div>
            </fieldset>
            <button className="btn btn-primary"
                    onClick={handleUpdate}
                    disabled={isLoading}>
                        Update Task
                    </button>
        </form>
    )
}
