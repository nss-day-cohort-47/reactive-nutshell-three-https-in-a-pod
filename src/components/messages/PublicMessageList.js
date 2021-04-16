// Ethan Mathis -- purpose is to render all public messages in one board and allow users to post new messages

import React, { useEffect, useState } from 'react'
import { getAllMessages, deleteMessage, updateMessage, getMessageById } from "../../modules/MessageManager"
import { MessageCard } from './MessageCard'
import { NewMessageInput } from './NewMessage'

export const MessageList = () => {

    const [messages, setMessages] = useState([])

    // gets all the messages and sets the state of messages
    const getMessages = () => {
        return getAllMessages()
        .then(allMessages => {
            setMessages(allMessages)
        })
    }

    // deletes the message by Id and the runs getMessages to render the updated list
    const handleDelete = (id) => {
        return deleteMessage(id)
        .then(() => getMessages())
    }


    useEffect(() => {
        // console.log(messages)
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

            <NewMessageInput getMessages={getMessages} />
                              
            
        </section>
    )
}