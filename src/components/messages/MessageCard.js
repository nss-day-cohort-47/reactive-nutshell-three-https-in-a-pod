// Ethan Mathis -- purpose is to create a "card" for each message with a delete (& edit?) button

import React from "react"

export const MessageCard = ({message, handleDelete}) => {
    return (
        <section className="messageCard">
            <div className="userName">From: {message.user.name}</div>
            <div className="message">{message.message}</div>
            <button type="button" className="btn btn-primary" onClick={() => handleDelete(message.id)}>Delete</button>
        </section>
    )
}