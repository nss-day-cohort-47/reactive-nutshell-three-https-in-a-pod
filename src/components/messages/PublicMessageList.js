// Ethan Mathis -- purpose is to render all public messages in one board and allow users to post new messages

import React, { useEffect, useState } from 'react'
import { getAllMessages, deleteMessage, updateMessage, getMessageById } from "../../modules/MessageManager"
import { MessageCard } from './MessageCard'
import { NewMessageInput } from './NewMessage'
import { getUserFriends, addFriend} from '../../modules/friendsListManager'


export const MessageList = () => {

    const [messages, setMessages] = useState([])
    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))
    
    const getMessages = () => {
        return getAllMessages()
        .then(allMessages => {
            setMessages(allMessages)
        })
    }
    
    const checkForFriend = (message) => {
        let isFriend =false
        getUserFriends(loggedInUser)
        .then(friends => {
            let checkedfriends = []
            checkedfriends = friends.filter(friend =>
                friend.userId === message.userId)
            console.log(checkedfriends.length)
            if (checkedfriends.userId > 0) {
                isFriend = true
            }

        })
        return isFriend
    }

    const handleAddFriend = (id) => {
        const newFriend = {
            currentUserId: loggedInUser,
            userId: id
        }
        let yes = window.confirm("Are you sure you would like to add them as a friend")
        if (yes === true) {
            addFriend(newFriend)
            getMessages()
        }

        
        
    }
    
    
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
               checkForFriend={checkForFriend}
               handleAddFriend={handleAddFriend}
               message={message}
               handleDelete={handleDelete}
               
                /> )}

            <NewMessageInput    getMessages={getMessages}
                                checkForFriend={checkForFriend}/>
                              
            
        </section>
    )
}