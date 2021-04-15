import React from "react"
import { Link } from 'react-router-dom'
import "./Tasks.css"

export const TaskCard = ({task, handleDelete, handleUpdate}) => {

    return (
    <section className="taskCard">
        <h3 className="taskTitle">{task.title}</h3>
        <div className="userName">Posted By: {task.user.name}</div>
        <div className="task">Description: {task.task}</div>
        <div className="taskDate">To Be Completed By: {task.completedby}</div>
        {/* <div className="isComplete">{task.isComplete}</div> */}
        <label htmlFor="checkbox">Completed <input type="checkbox" 
                                                   id="checkbox" 
                                                   name="checkbox" 
                                                   
                                                   onChange={() => handleUpdate(task)} /></label>
        <Link to={`/tasks/${task.id}/edit`}><button>Edit</button></Link>
        <button type="button" className="btn btn-delete" onClick={() => handleDelete(task.id)}>Remove</button>
    </section>
    )

}