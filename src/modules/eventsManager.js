//Logan Demmy-- Fetch calls for events tab
const url = "http://localhost:8088"

//get all events including the user who posted them
export const getEventsById = (id) => {
    return fetch(`${url}/events?userId=${id}&_expand=user`)
    .then(response => response.json())    
}

//remove events from json
export const deleteEvent = (eventId) => {
    return fetch(`${url}/events/${eventId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json()) 
}

//function to post new event
export const createEvent = eventObj => {
    return fetch(`${url}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventObj)
        
    })
        .then(response => response.json())
}

//function to update event
export const editEvent = eventObj => {
    return fetch(`${url}/events/${eventObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventObj)
        
    })
        .then(response => response.json())
}

//function to get single event
export const getEventById = id => {
    return fetch(`${url}/events/${id}`)
    .then(response => response.json()) 
}