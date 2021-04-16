// Ethan Mathis -- purpose is to render all public messages in one board and allow users to post new messages

import React, { useEffect, useState } from 'react'
import { getAllMessages, deleteMessage } from "../../modules/MessageManager"
import { MessageCard } from './MessageCard'
import { NewMessageInput } from './NewMessage'
import { addMessage } from '../../modules/MessageManager'


export const MessageList = () => {

    const [messages, setMessages] = useState([])
    const [storage, setStorage] = useState(false)
    

    const getMessages = () => {
        return getAllMessages()
        .then(allMessages => {
            localStorage.setItem("new_message", false) 
            setMessages(allMessages)
        })
    }


    const handleDelete = (id) => {
        return deleteMessage(id)
        .then(() => getMessages())
    }

    // localStorage.setItem("new_message", false)

    

    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))
    const [isLoading, setIsLoading] = useState(false)
    const [newMessage, setNewMessage] = useState({
        userId: loggedInUser,
        message: ""
    })
    const handleInputChange = (event) => {
        const newMessageCopy = {...newMessage}
        let selectedVal = event.target.value
        newMessageCopy[event.target.id] = selectedVal
        setNewMessage(newMessageCopy)
    }
    const handleAddMessage = (event) => {
        localStorage.setItem("new_message", true)
        setIsLoading(true)
        addMessage(newMessage)
        .then(() => {
            getMessages()
            setIsLoading(false)
            setNewMessage({
                userId: loggedInUser,
                message: ""
            })
        })
    }
    
    const checkStorage = () => {
        if(localStorage.getItem("new_message") === "true") {
            console.log("working")
            setStorage(true)
            return true
        }
        return false
    }

    
    useEffect(()=>{
        getMessages()
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
            if (checkStorage() === true) {
                getMessages()
            }
        }, 100);
        return () => clearInterval(interval);
    }, [storage]);
    

    return (
        <section className="messageList">
            <h2>Message Board</h2>
            {messages.map(message =>
               <MessageCard
               key={message.id}
               message={message}
               handleDelete={handleDelete}
                /> )}

            <NewMessageInput getMessages={getMessages}
                                handleAddMessage={handleAddMessage}
                                handleInputChange={handleInputChange}
                                isLoading={isLoading}
                                newMessage={newMessage} />
                              
            
        </section>
    )
}