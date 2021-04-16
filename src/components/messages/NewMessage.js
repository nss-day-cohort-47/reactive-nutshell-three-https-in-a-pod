// Ethan Mathis -- purpose is to render the new message text input field

import React, { useState } from 'react';
import { addMessage } from '../../modules/MessageManager';

export const NewMessageInput = ({getMessages}) => {
    
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
        event.preventDefault()
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


    return (
        <div className="newMessageInput">
                <label htmlFor="newMessage">
                    <input type="text"
                           id="message"
                           className="newMessage"
                           placeholder="New Message"
                           value={newMessage.message}
                           onChange={handleInputChange} />
                </label>
            <button type="button" 
                        className="article-btn"
                        disabled={isLoading} 
                        onClick={handleAddMessage}>
                            Send
            </button>
            </div>
    )
}



