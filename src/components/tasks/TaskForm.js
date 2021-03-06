//  Ethan Mathis -- purpose is to render the New Task Form and add the new task to the db on submit

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addTask } from '../../modules/TaskManager'

export const TaskForm = () => {

    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    const [isLoading, setIsLoading] = useState(false)

    // sets the initial state of task (isComplete should always be set to false on creation)
    const [task, setTask] = useState({
        userId: loggedInUser,
        title: "",
        task: "",
        completedby: "",
        isComplete: false
    })

    const history = useHistory()

    const handleInputChange = (event) => {
        const newTask = { ...task }
        let selectedVal = event.target.value
        newTask[event.target.id] = selectedVal
        setTask(newTask)
        // console.log(task)
    }

    const handleSaveTask = (event) => {
        event.preventDefault()
        setIsLoading(true)
        console.log(task)
        addTask(task)
            .then(() => history.push("/tasks"))
    }

    return (
        <form>
            <h2>New Task</h2>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="title">Title:</label>
                    <input type="text"
                        id="title"
                        className="form-control"
                        required
                        autoFocus
                        placeholder="Name Your Task"
                        value={task.title}
                        onChange={handleInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="task">Task Description:</label>
                    <input type="text"
                        id="task"
                        className="form-control"
                        required
                        autoFocus
                        placeholder="Task Details"
                        value={task.task}
                        onChange={handleInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="formGroup">
                    <label htmlFor="completedby">To Be Completed By:</label>
                    <input type="date"
                        className="form-control"
                        id="completedby"
                        value={task.completedby}
                        onChange={handleInputChange} />
                </div>
            </fieldset>
            <button className="article-btn"
                onClick={handleSaveTask}
                disabled={isLoading}>
                Save Task
                   </button>
        </form>
    )
}