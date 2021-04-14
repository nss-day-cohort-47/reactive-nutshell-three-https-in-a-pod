import React from "react"
import { Route } from "react-router-dom"
import { ArticleList } from "./articles/ArticleList"
import { FriendsList } from "./friends/FriendsList"
import { EventList } from "./events/EventList"
import { EventEntry } from "./events/EventForm"
import { EventEditForm } from "./events/EventEdit"

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
      <Route path="/tasks">
        {/* Render the component for the user's tasks */}
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
