//Hunter Preast, Ethan Mathis, Logan Demmy-- Create cards with matching results from the search bar, with add button
import React from "react"

export const SearchCard = ({res, handleAddFriend}) => {
    // console.log(friend)
    return (
        <article className="searchFriendName">
            <h3>{res.name}</h3>
            <button type="button" onClick={() => handleAddFriend(res.id)}>Add Friend</button>
        </article>
    )
}