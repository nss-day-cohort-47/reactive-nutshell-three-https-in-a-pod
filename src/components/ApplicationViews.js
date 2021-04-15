import React from "react"
import { Route } from "react-router-dom"
import { ArticleList } from "./articles/ArticleList"
import { FriendsList } from "./friends/FriendsList"
import { TaskList } from "./tasks/TaskList"
import { EventList } from "./events/EventList"
import { ArticleForm } from "./articles/ArticleForm"
import { EventEntry } from "./events/EventForm"
import { EventEditForm } from "./events/EventEdit"
import { TaskForm } from "./tasks/TaskForm"
import { TaskEditForm } from "./tasks/TaskEditForm"
import { ArticleEdit } from "./articles/ArticleEdit"
import { MessageList } from "./messages/PublicMessageList"


export const ApplicationViews = () => {
  return (
    <>

      <Route exact path="/">
        <ArticleList />
      </Route>
      <Route exact path="/articles/create">
        <ArticleForm />
      </Route>
      <Route path="/articles/:articleId(\d+)/edit">
        <ArticleEdit />
      </Route>
      <Route path="/friends">
        <FriendsList />
      </Route>
      <Route path="/messages">
        <MessageList /> 
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
