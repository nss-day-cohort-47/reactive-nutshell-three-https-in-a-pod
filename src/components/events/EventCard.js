//Logan Demmy- card to display events that have been provided by the eventlist

import './Event.css'
import React from 'react'
import { Link } from 'react-router-dom'

export const EventCard = ({event, deleteSetEvent, loggedInUser, index, getDailyWeather}) => {
    return (
        <>
        {index === 0 ?
        <>
            <article className="nextevent">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-message">{event.message}</p>
                <p className="event-eventdate">Date: {event.eventdate} at {event.eventtime} </p>
                <p className="event-location">Location: {event.location}</p>
                <p className="event-posted">Posted by: {event.user.name} </p>
                <button type="button" className="btn" onClick={() => getDailyWeather(event)}>Get Weather</button>
                {loggedInUser === event.userId ? <><Link to={`/events/${event.id}/edit`}><button className="btn">Edit</button></Link>
                <button type="button" className="btn" onClick={() => deleteSetEvent(event.id)}>Delete</button> </> : ""}
            </article>
            <hr /><hr />
        </>
        : 
        <>
        {loggedInUser === event.userId ? 
        
        <>
            <article className="user-event-card">
            <h3 className="user-event-title">{event.title}</h3>
            <p className="user-event-message">{event.message}</p>
            <p className="user-event-eventdate">Date: {event.eventdate} at {event.eventtime} </p>
            <p className="user-event-location">Location: {event.location}</p>
            <p className="user-event-posted">Posted by: {event.user.name} </p>
                <Link to={`/events/${event.id}/edit`}><button className="btn">Edit</button></Link>
                <button type="button" className="btn"onClick={() => deleteSetEvent(event.id)}>Delete</button> 
            {index === 0 ? <><hr /><hr /></>: ""}
        </article>
        </> : <>
        <article className="event-card">
            {index === 0 ? <h2 className="nextevent">Next Event</h2>: ""}
            <h3 className="event-title">{event.title}</h3>
            <p className="event-message">{event.message}</p>
            <p className="event-eventdate">Date: {event.eventdate} at {event.eventtime} </p>
            <p className="event-location">Location: {event.location}</p>
            <p className="event-posted">Posted by: {event.user.name} </p>
            <button type="button" onClick={() => getDailyWeather(event)}>Get Weather</button>
        </article>
        </>
        } 
        </>
        }  
    </>
    )
}