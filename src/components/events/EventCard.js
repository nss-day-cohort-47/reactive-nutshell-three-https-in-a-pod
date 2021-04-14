//Logan Demmy- card to display events that have been provided by the eventlist


import React from 'react'
import { Link } from 'react-router-dom'

export const EventCard = ({event, deleteSetEvent}) => {
    return (
        <article className="event-card">
            <h3 className="event-title">{event.title}</h3>
            <p className="event-message">{event.message}</p>
            <p className="event-eventdate">Date: {event.eventdate} at {event.eventtime} </p>
            <p className="event-location">Location: {event.location}</p>
            <p className="event-posted">Posted by: {event.user.name} </p>
            <Link to={`/events/${event.id}/edit`}>
                <button>Edit</button>
            </Link>
            <button type="button" onClick={() => deleteSetEvent(event.id)}>Delete</button>
        </article>
    )
}