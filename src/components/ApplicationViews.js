import React from "react"
import { Route } from "react-router-dom"
import { ArticleList } from "./articles/ArticleList"
import { FriendsList } from "./friends/FriendsList"
import { TaskList } from "./tasks/TaskList"
import { EventList } from "./events/EventList"
import { TaskForm } from "./tasks/TaskForm"

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

      <Route path="/tasks/create">
        <TaskForm />
      </Route>

      <Route path="/events">
        <EventList />
      </Route>
    </>
  )
}
