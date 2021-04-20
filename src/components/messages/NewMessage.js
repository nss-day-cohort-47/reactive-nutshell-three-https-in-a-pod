// Ethan Mathis -- purpose is to render the new message text input field

import React, { useState } from 'react';
import { addMessage } from '../../modules/MessageManager';

export const NewMessageInput = ({getMessages, isFriends}) => {
    
    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    const [isLoading, setIsLoading] = useState(false)
    const [newMessage, setNewMessage] = useState({
        userId: loggedInUser,
        friendId: 0,
        message: ""
    })

    const handleInputChange = (event) => {
        const newMessageCopy = {...newMessage}
        let selectedVal = event.target.value
        newMessageCopy[event.target.id] = selectedVal
        setNewMessage(newMessageCopy)
    }
    
    const checkForPrivateMessage = () => {
        let pm = {...newMessage}
        if(newMessage.message.startsWith("@")) {
            // stores the "@name_here" in a variable for later
            let buddy = newMessage.message.split(" ",1 )[0]
            let actualMessage = newMessage.message.replace(buddy, "PM:")
            buddy = buddy.replace("@", "")
            buddy = buddy.replace("_", " ")
            const friendObj = isFriends.filter(friend => friend.user.name.toLowerCase() === buddy.toLowerCase())
            // stores the message at the @name_here and replaces it with "PM:" and stores it in a variable 
            if (friendObj[0].userId > 0){
                pm = {
                    userId: loggedInUser,
                    message: actualMessage,
                    friendId: friendObj[0].userId
                }
            }
            // setNewMessage(pm)
        }
        return pm
    }
    
    const handleAddMessage = (event) => {
        event.preventDefault()
        const messageToAdd = checkForPrivateMessage()
        setIsLoading(true)
        addMessage(messageToAdd)
        .then(() => {
            getMessages()
            localStorage.setItem("new_message", true)
            setIsLoading(false)
            setNewMessage({
                userId: loggedInUser,
                message: "",
                friendId: 0
            })
        })
    }

    return (
        <div className="newMessageInput">
                <label htmlFor="newMessage">
                    </label>
                    <input type="text"
                           id="message"
                           className="newMessage"
                           placeholder="New Message"
                           value={newMessage.message}
                           onChange={handleInputChange} />
            <button type="button" 
                        className="article-btn"
                        disabled={isLoading} 
                        onClick={handleAddMessage}>
                            Send
            </button>
        </div>
    )
}



