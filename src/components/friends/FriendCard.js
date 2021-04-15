//Hunter Preast, Ethan Mathis, Logan Demmy-- Create cards with friends name with ability to delete
import React from "react"
import "./Friends.css"

export const FriendCard = ({friend, handleDelete}) => {
    // console.log(friend)
    return (
        <article className="friendName">
            <h3>{friend.user.name}</h3>
            <button type="button" className="btn" onClick={() => handleDelete(friend.id)}>Delete</button>
        </article>
    )
}