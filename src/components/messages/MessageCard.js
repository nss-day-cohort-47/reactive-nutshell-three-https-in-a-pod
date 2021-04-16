// Ethan Mathis -- purpose is to create a "card" for each message with a delete (& edit?) button

import React from "react"

export const MessageCard = ({message, handleDelete}) => {
    return (
        <section className="messageCard">
            <div className="message">{message.user.name}: {message.message}
            <button type="button" className="article-btn" onClick={() => handleDelete(message.id)}>Delete</button>
            </div>
        </section>
    )
}