import React from "react"

export const TaskCard = ({ task }) => (
    <section className="taskCard">
        <h3 className="taskTitle">{task.title}</h3>
        <div className="task">Description: {task.task}</div>
        <div className="taskDate">Completion Date: {task.completedby}</div>
        <input type="checkbox" id="checkbox" />
        <button type="button" className="btn btn-delete">Remove</button>
    </section>
)

