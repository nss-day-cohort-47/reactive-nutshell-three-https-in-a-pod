//Logan Demmy-- Fetch calls for events tab
const url = "http://localhost:8088"

//get all events including the user who posted them
export const getAllEvents = () => {
    return fetch(`${url}/events?_expand=user`)
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

//function to post new articles
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