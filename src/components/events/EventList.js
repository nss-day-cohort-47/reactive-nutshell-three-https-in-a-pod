//Logan Demmy - Component to build list of events populated by the users

import React, { useState, useEffect } from 'react'
import { EventCard } from './EventCard'
import { getEventsById, deleteEvent } from '../../modules/eventsManager'
import { useHistory } from 'react-router-dom'
import { getUserFriends } from '../../modules/friendsListManager'

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
    const timeconverter = (time) => {
      console.log(time)
      let myDate = new Date(time)
      let shortend = myDate.toISOString()
      return shortend;
    }
    let friendEvents = []
    const getEvents = () => {
        return getUserFriends(loggedInUser).then(friends => {
          friends.forEach(friend => {
            getEventsById(friend.user.id).then(
              events => {
                friendEvents = friendEvents.concat(events)
                console.log(friendEvents)})
            .then(() => getEventsById(loggedInUser)
            .then(events => { 
              let allEvents = []
              allEvents = friendEvents.concat(events)
              const sortedEvents = allEvents.sort(compareValues('eventdate', 'asc'))
              sortedEvents.filter(event => event.eventdate < timeconverter(Date.now()))
              setEvents(sortedEvents)
            })
            )
          })
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