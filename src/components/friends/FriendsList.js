//Hunter Preast, Ethan Mathis, Logan Demmy-- Display friends list
import React, { useState, useEffect } from "react"
import { getUserFriends, addFriend, deleteFriend } from "../../modules/friendsListManager"
import { FriendCard } from "./FriendCard"

export const FriendsList = () => {
    const [friends, setFriends] = useState([]);

    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))
    
    const getLoggedFriends = () => {
        return getUserFriends(loggedInUser)
        .then(friendsFromAPI => {
            console.log(friendsFromAPI)
            setFriends(friendsFromAPI)
        })
    }

    const handleDelete = (id) => {
        deleteFriend(id).then(() => 
            getLoggedFriends()
        )
    }

    useEffect(() => {
        getLoggedFriends()
    }, [])

    return (
        <section className="friendList">
            <div className="friendCard">
                {friends.map(friend => 
                    <FriendCard 
                    key={friend.id}
                    friend={friend}
                    handleDelete={handleDelete} />
                )}
            </div>
        </section>
    )
}