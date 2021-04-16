// Ethan Mathis -- purpose is to create a "card" for each message with a delete (& edit?) button

import React from "react"
import { Link } from "react-router-dom"

export const MessageCard = ({message, handleDelete, checkForFriend, handleAddFriend}) => {
    
    
    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    return (
        <section className="messageCard">
            <div className="message"> { checkForFriend(message) ? <>{message.user.name} </>:<button type="button" className="article-btn" onClick={() => handleAddFriend(message.userId)}>{message.user.name}</button>} : {message.message}
            {message.userId === loggedInUser ? 
            <>
            <div className="message-btns">
                <Link to={`/messages/${message.id}/edit`}>
                <button type="button" className="message-btn">Edit</button>
                </Link>
                <button type="button" 
                        className="message-btn" 
                        onClick={() => handleDelete(message.id)}>
                            Delete
                </button>

            </div>
            </>
            : null
        }</div>
        </section>
    )
}