// Ethan Mathis -- purpose = to fetch the loggedInUser tasks and return them as a list of TaskCards

import React, { useEffect, useState } from 'react';
import { getTasksById } from "../../modules/TaskManager";
import { TaskCard } from "./TaskCard"

export const TaskList = () => {
    // sets the initial state of the list of tasks to be displayed
    const [tasks, setTasks] = useState([]);

    // gets the Id of the currently logged in user
    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    // returns an array of the currently logged in user's tasks
    const getLoggedTasks = () => {
        return getTasksById(loggedInUser)
        .then(userTasks => {
            console.log("userTasks", userTasks)
            setTasks(userTasks)
        })
    }

    useEffect(() => {
        getLoggedTasks()
    }, [])

    return (
        <section className="taskList">
            <div className="taskCard">
                {tasks.map(task => 
                    <TaskCard 
                    key={task.id}
                    task={task} />)}
            </div>
        </section>
    )
}