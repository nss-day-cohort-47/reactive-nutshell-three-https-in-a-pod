// Ethan Mathis -- purpose is to create a "card" for each message with a delete (& edit?) button

import React from "react"


export const MessageCard = ({message, handleDelete, addfriend}) => {
    return (
        <section className="messageCard">
            <div className="message"><button type="button" className="article-btn" onClick={() => addfriend(message.user.id)}>{message.user.name}</button>: {message.message}
            <button type="button" className="article-btn" onClick={() => handleDelete(message.id)}>Delete</button>
            </div>
        </section>
    )
}