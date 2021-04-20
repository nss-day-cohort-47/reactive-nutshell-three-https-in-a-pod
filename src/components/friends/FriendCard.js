//Hunter Preast, Ethan Mathis, Logan Demmy-- Create cards with friends name with ability to delete
import React from "react"
import "./Friends.css"

export const FriendCard = ({friend, handleDelete}) => {
    return (
        <article className="friendName">
            <h3>{friend.user.name}</h3>
            <button type="button" className="article-btn" onClick={() => handleDelete(friend.id)}>Delete</button>
        </article>
    )
}