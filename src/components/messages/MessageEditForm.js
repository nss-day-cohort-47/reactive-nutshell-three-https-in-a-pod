import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { getMessageById, updateMessage } from "../../modules/MessageManager";

export const EditMessageCard = () => {

    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    const [editMessage, setEditMessage] = useState({})
    const[isLoading, setIsLoading] = useState(false)
    const {messageId} = useParams()
    const history = useHistory()

    const handleInputChange = (event) => {
        const newMessage = {...editMessage}
        let selectedVal = event.target.value
        newMessage[event.target.id] = selectedVal
        setEditMessage(newMessage)
    }

    const handleSaveMessage = (event) => {
        event.preventDefault()
        setIsLoading(true)
        const editedMessage = {
            id: editMessage.id,
            userId: loggedInUser,
            message: editMessage.message
        }
        updateMessage(editedMessage)
        .then(() => history.push("/messages"))
    }

    useEffect(() => {
        getMessageById(messageId)
        .then(message => {
            setEditMessage(message)
            setIsLoading(false)
        })
    }, [])

    return (
        <div className="editForm">
            <input type="text"
                   id="message"
                   className="editMessage"
                   value={editMessage.message}
                   onChange={handleInputChange} />

            <button type="button"
                    className="article-btn"
                    disabled={isLoading}
                    onClick={handleSaveMessage}>Save</button>
        </div>
    )
}