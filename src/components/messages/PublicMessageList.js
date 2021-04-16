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
        return getUserFriends(loggedInUser)
        .then(friends => {
            let isFriend =false
            let checkedfriends = []
            checkedfriends = friends.filter(friend =>
                friend.userId === message.userId)
            console.log(checkedfriends.length)
            if (checkedfriends.length > 0) {
                isFriend = true
            }
            console.log(isFriend)
        return isFriend
        })
      
    }
    console.log(checkForFriend())

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
            <h2 className="messageHeader">Message Board</h2><hr></hr>
            <div className="messageBottom">
            {messages.map(message =>
               <MessageCard
               key={message.id}
               checkForFriend={checkForFriend}
               handleAddFriend={handleAddFriend}
               message={message}
               handleDelete={handleDelete}
               
                /> )}

            </div> 
            <div className="messageInput">
                <NewMessageInput getMessages={getMessages} />
            </div>                  
        </section>
    )
}