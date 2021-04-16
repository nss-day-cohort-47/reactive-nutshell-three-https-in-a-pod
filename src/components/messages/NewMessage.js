// Ethan Mathis -- purpose is to render the new message text input field

import React from 'react';


export const NewMessageInput = ({handleAddMessage, handleInputChange, isLoading, newMessage}) => {
    
  

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



