import React from "react"

export const TaskCard = ({task, handleDelete}) => {
    return (
    <section className="taskCard">
        <h3 className="taskTitle">{task.title}</h3>
        <div className="userName">Posted By: {task.user.name}</div>
        <div className="task">Description: {task.task}</div>
        <div className="taskDate">To Be Completed By: {task.completedby}</div>
        <input type="checkbox" id="checkbox" />
        <button type="button" className="btn btn-delete" onClick={() => handleDelete(task.id)}>Remove</button>
    </section>
    )

}