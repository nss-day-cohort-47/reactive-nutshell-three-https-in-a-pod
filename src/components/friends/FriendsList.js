//Hunter Preast, Ethan Mathis, Logan Demmy-- Display friends list
import React, { useState, useEffect } from "react"
import { getUserFriends, addFriend, deleteFriend } from "../../modules/friendsListManager"
import { getAllUsers } from "../../modules/userManager";
import { FriendCard } from "./FriendCard"
import { SearchCard } from "./SearchCard"

export const FriendsList = () => {
    const [friends, setFriends] = useState([]);
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);

    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))
    
    const getLoggedFriends = () => {
        return getUserFriends(loggedInUser)
        .then(friendsFromAPI => {
            // console.log(friendsFromAPI)
            setFriends(friendsFromAPI)
        })
    }

    const handleDelete = (id) => {
        deleteFriend(id).then(() => 
            getLoggedFriends()
        )
    }

    const handleAddFriend = (id) => {
        const newFriend = {
            currentUserId: loggedInUser,
            userId: id
        }
        addFriend(newFriend)
        .then(() => getLoggedFriends())
    }

    const handleInputChange = (event) => {
        // if (event.target.value !== "") {
            // let stateToChange = {...search}
            let stateToChange = event.target.value
            setSearch(stateToChange.toLowerCase())
        

    }

    const results = (searchString) => {
        if(searchString.length > 0) {
            console.log("searchString", searchString)
            getAllUsers()
            .then(response => {
                let matchingUsers = response.filter(user => {
                    if(user.name.toLowerCase().includes(searchString) && user.id !== loggedInUser) {
                        return true
                    }
                })
                // console.log("matching users", matchingUsers)
                setResult(matchingUsers)
            }) 
        } 
        else setResult([])
    }

    useEffect(() => {
        getLoggedFriends()
    }, [])

    useEffect(() => {
        results(search)
    }, [search])
    
    
    return (
        <section className="friendList">
           <div className="searchBox">
               {/* <label></label> */}
            <input type="text" 
                   id="search" 
                   className="friendSearch" 
                   required 
                   onChange={handleInputChange}
                   placeholder="Search For a Friend"
                   
                    />
            <div className="searchResults">
                {result.length === 0 ? <div></div> :
                 result.map(res => 
                    <SearchCard 
                    key={res.id}
                    res={res}
                    handleAddFriend={handleAddFriend} />
                    )}
            </div>
            </div> 
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