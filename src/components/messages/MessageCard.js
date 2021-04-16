// Ethan Mathis -- purpose is to create a "card" for each message with a delete (& edit?) button

import React from "react"

export const MessageCard = ({message, handleDelete, checkForFriend, handleAddFriend}) => {
    let friendcheck = false
    friendcheck = checkForFriend(message)
    console.log(friendcheck)
    return (
        <section className="messageCard">
            <div className="message">{ friendcheck ? <>{message.user.name} </>:<button type="button" className="article-btn" onClick={() => handleAddFriend(message.userId)}>{message.user.name}</button>} : {message.message}
            <button type="button" className="article-btn" onClick={() => handleDelete(message.id)}>Delete</button>
            </div>
        </section>
    )
}