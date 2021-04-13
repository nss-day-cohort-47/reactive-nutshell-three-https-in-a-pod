//  Ethan Mathis -- purpose is to render the New Task Form and add the new task to the db on submit

import React, { useState, useEffect } from 'react';
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
        let selectedVal = event.target.value 
        setTask(selectedVal)
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
               <div className="formTitle">
                   <label htmlFor="title">Title:</label>
                   <input type="text" 
                          autoFocus 
                          placeholder="Name Your Task"
                          value={task.title}
                          onChange={handleInputChange}  />
               </div>
           </fieldset>
           <fieldset>
               <div className="formTask">
                   <label htmlFor="task">Task Description:</label>
                   <input type="text" 
                          autoFocus 
                          placeholder="Task Details"
                          value={task.task}
                          onChange={handleInputChange}  />
               </div>
           </fieldset>
           <fieldset>
               <div className="formCompleteDate">
                   <label htmlFor="title">To Be Completed By:</label>
                   <input type="date" 
                          value={task.completedby}
                          onChange={handleInputChange}  />
               </div>
           </fieldset>
           <button className="btn btn-primary"
                   onClick={handleSaveTask}
                   disabled={isLoading}>
                       Save Task
                   </button>
       </form>
   )
}