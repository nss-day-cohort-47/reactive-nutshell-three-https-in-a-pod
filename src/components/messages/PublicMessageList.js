// Ethan Mathis -- purpose is to render all public messages in one board and allow users to post new messages

import React, { useEffect, useState } from 'react'
import { getAllMessages, deleteMessage, updateMessage, getMessageById } from "../../modules/MessageManager"
import { MessageCard } from './MessageCard'
import { NewMessageInput } from './NewMessage'
import { getUserFriends, addFriend} from '../../modules/friendsListManager'


export const MessageList = () => {

    const [isFriends, setIsFriends] = useState([])
    const [messages, setMessages] = useState([])
    const [storage, setStorage] = useState(false)
    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))
    
    const getMessages = () => {
        return getAllMessages()
        .then(allMessages => {
            setMessages(allMessages)
        })
    }
    
    const getMessageFriends = () => {
        return getUserFriends(loggedInUser)
        .then(friends => setIsFriends(friends))
    }
            
            
    const checkForFriend = (message) => {         
            let isFriend =false
            let checkedfriends = []
            checkedfriends = isFriends.filter(friend =>
                friend.userId === message.userId)
 
            if (checkedfriends.length > 0) {
                isFriend = true
            } else if (message.userId === loggedInUser) {
                isFriend = true
            }
        return isFriend
        }
    

    const handleAddFriend = (id) => {
        const newFriend = {
            currentUserId: loggedInUser,
            userId: id
        }
        let yes = window.confirm("Are you sure you would like to add them as a friend")
        if (yes === true) {
            addFriend(newFriend).then(()=>{
                getMessages()
            })
        }

        
        
    }
    
    const checkStorage = () => {
        if(localStorage.getItem("new_message") === "true") {
            console.log("working")
            setStorage(true)
            return true
        }
        return false
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (checkStorage() === true) {
                getMessages().then(() => {
                    localStorage.setItem("new_message", false)
                })
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);
    
    const handleDelete = (id) => {
        return deleteMessage(id)
        .then(() => getMessages())
    }

    useEffect(() => {
        getMessageFriends()
    }, [storage])

    useEffect(() => {
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