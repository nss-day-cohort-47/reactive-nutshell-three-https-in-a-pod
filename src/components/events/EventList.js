//Logan Demmy - Component to build list of events populated by the users

import React, { useState, useEffect } from 'react'
import { EventCard } from './EventCard'
import { getAllEvents, deleteEvent } from '../../modules/eventsManager'
import { useHistory } from 'react-router-dom'

export const EventList = () => {
    const [events, setEvents] = useState([])
    const history = useHistory()
    const loggedInUser = JSON.parse(sessionStorage.getItem("nutshell_user"))

    const compareValues = (key, order = 'asc') => {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
          }
      
          const varA = (typeof a[key] === 'string')
            ? a[key] : a[key];
          const varB = (typeof b[key] === 'string')
            ? b[key] : b[key];
      
          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order === 'desc') ? (comparison * -1) : comparison
          );
        };
    }



    const getEvents = () => {
        return getAllEvents().then(eventsFromApi => {
            const sortedEvents = eventsFromApi.sort(compareValues('eventdate', 'asc'))
            setEvents(sortedEvents)
        })
    }



    const deleteSetEvent = (id) => {
        deleteEvent(id)
        .then(() => getEvents())
    }

    useEffect(() => {
        getEvents();
    }, [])
    return (
        <>
            <section className="event-content">
                <button type="button" 
                        className="btn"
                        onClick={() => {history.push('/events/create')}}>New Event
                        </button>
            </section>
            <div className="event-cards">
                {events.map( (event, index) => <EventCard event={event}
                                                key={event.id}
                                                index={index}
                                                loggedInUser={loggedInUser}
                                                deleteSetEvent={deleteSetEvent} />)} 
            </div>
        </>
    )
} 