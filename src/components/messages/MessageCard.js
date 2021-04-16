// Ethan Mathis -- purpose is to create a "card" for each message with a delete (& edit?) button

import React from "react"
import { Link } from "react-router-dom"

export const MessageCard = ({message, handleDelete, checkForFriend, handleAddFriend}) => {
    let friendcheck = false
    friendcheck = checkForFriend(message)
    console.log(friendcheck)
    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    return (
        <section className="messageCard">
            <div className="message">{ friendcheck ? <>{message.user.name} </>:<button type="button" className="article-btn" onClick={() => handleAddFriend(message.userId)}>{message.user.name}</button>} : {message.message}
            {message.userId === loggedInUser ? 
            <>
                <Link to={`/messages/${message.id}/edit`}>
                <button type="button" >Edit</button>
                </Link>
                <button type="button" 
                        className="article-btn" 
                        onClick={() => handleDelete(message.id)}>
                            Delete
                </button>
            </>
            : null
        }</div>
        </section>
    )
}