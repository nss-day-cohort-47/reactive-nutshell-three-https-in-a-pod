// Ethan Mathis -- purpose is to render all public messages in one board and allow users to post new messages

import React, { useEffect, useState } from 'react'
import { getAllMessages, deleteMessage } from "../../modules/MessageManager"
import { MessageCard } from './MessageCard'
import { NewMessageInput } from './NewMessage'

export const MessageList = () => {

    const [messages, setMessages] = useState([])


    const getMessages = () => {
        return getAllMessages()
        .then(allMessages => {
            setMessages(allMessages)
        })
    }


    const handleDelete = (id) => {
        return deleteMessage(id)
        .then(() => getMessages())
    }


    useEffect(() => {
        getMessages()
    }, [])

    return (
        <section className="messageList">
            <h2>Message Board</h2>
            {messages.map(message =>
               <MessageCard
               key={message.id}
               message={message}
               handleDelete={handleDelete}
                /> )}

            <NewMessageInput />
                              
            
        </section>
    )
}