import React from "react"
import { Route } from "react-router-dom"
import { ArticleList } from "./articles/ArticleList"
import { FriendsList } from "./friends/FriendsList"
import { TaskList } from "./tasks/TaskList"
import { EventList } from "./events/EventList"
import { EventEntry } from "./events/EventForm"
import { EventEditForm } from "./events/EventEdit"
import { TaskForm } from "./tasks/TaskForm"
import { TaskEditForm } from "./tasks/TaskEditForm"


export const ApplicationViews = () => {
  return (
    <>

      <Route exact path="/">
        <ArticleList />
      </Route>
      <Route path="/friends">
        <FriendsList />
      </Route>
      <Route path="/messages">
        {/* Render the component for the messages */}
      </Route>

      <Route exact path="/tasks">
        <TaskList />
      </Route>

      <Route path="/tasks/:taskId(\d+)/edit">
        <TaskEditForm />
      </Route>

      <Route path="/tasks/create">
        <TaskForm />
      </Route>
 
      <Route exact path="/events">
        <EventList />
      </Route>

      <Route exact path="/events/:eventId(\d+)/edit">
        <EventEditForm />
      </Route>
      
      <Route exact path="/events/create">
        <EventEntry />
      </Route>
    </>
  )
}
