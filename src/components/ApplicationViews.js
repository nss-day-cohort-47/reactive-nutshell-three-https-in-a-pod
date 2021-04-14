import React from "react"
import { Route } from "react-router-dom"
import { ArticleList } from "./articles/ArticleList"
import { FriendsList } from "./friends/FriendsList"
import { EventList } from "./events/EventList"
import { ArticleForm } from "./articles/ArticleForm"

export const ApplicationViews = () => {
  return (
    <>

      <Route exact path="/">
        <ArticleList />
      </Route>
      <Route exact path="/articles/create">
        <ArticleForm />
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
      <Route path="/events">
        <EventList />
      </Route>
    </>
  )
}
