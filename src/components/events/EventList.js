//Logan Demmy - Component to build list of events populated by the users

import React, { useState, useEffect } from 'react'
import { EventCard } from './EventCard'
import { getAllEvents, deleteEvent } from '../../modules/eventsManager'
import { useHistory } from 'react-router-dom'

export const EventList = () => {
    const [events, setEvents] = useState([])
    const history = useHistory()

    const getEvents = () => {
        return getAllEvents().then(eventsFromApi => {
            setEvents(eventsFromApi)
        })
    }

    const deleteSetEvent = (id) => {
        deleteEvent(id)
        .then(() => getEvents())
    }

    useEffect(() => {
        getEvents();
    }, [])
    console.log(events)
    return (
        <>
            <section className="event-content">
                <button type="button" 
                        className="btn"
                        onClick={() => {history.push('/events/create')}}>New Event
                        </button>
            </section>
            <div className="event-cards">
                {events.map(event => <EventCard event={event}
                                                key={event.id}
                                                deleteSetEvent={deleteSetEvent} />)} 
            </div>
        </>
    )
} 