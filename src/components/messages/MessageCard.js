// Ethan Mathis -- purpose is to create a "card" for each message with a delete (& edit?) button

import React from "react"
import { Link } from "react-router-dom"

export const MessageCard = ({message, handleDelete, checkForFriend, handleAddFriend}) => {
    
    
    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    return (
        <section className="messageCard">
            {/* Turinary statement to check for if the logged in user is friend with the person who sent the message. Also if the message was sent by the logged in user */}
            <div className="message"> {checkForFriend(message) ? <>{message.userId === loggedInUser ? "YOU" : <>{message.user.name}</>}</>
                                         :<button type="button" className="article-btn" onClick={() => handleAddFriend(message.userId)}>
                                        {message.userId === loggedInUser ? "YOU: " : <>{message.user.name}</>} </button>} : {message.message}
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