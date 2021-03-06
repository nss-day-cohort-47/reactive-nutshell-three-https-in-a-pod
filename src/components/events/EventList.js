//Logan Demmy - Component to build list of events populated by the users

import React, { useState, useEffect } from 'react'
import { EventCard } from './EventCard'
import { getEventsById, deleteEvent } from '../../modules/eventsManager'
import { useHistory } from 'react-router-dom'
import { getUserFriends } from '../../modules/friendsListManager'
import { getCoordinates, getWeather } from '../../modules/weatherManager'
import { WeatherCard } from './weather/WeatherCard'

export const EventList = () => {
    const [events, setEvents] = useState([])
    const [weather, setWeather] = useState({})
    const [dailyWeather, setDailyWeather] = useState(false)

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

  
    
    const api = "48a431e8f8f50c0b8cac2504f6e7d4d4"
    const getDailyWeather = (eventObj) => {
      return getCoordinates(eventObj.location)
      .then(coords => {
        getWeather(coords.lat, coords.lon , api).then(
          weather => {
            let dailyweather = {}
            dailyweather = weather.filter(daily => {
              if (daily.dt <= timeconverter(eventObj.eventdate) && timeconverter(eventObj.eventdate) <= daily.dt + 86400) {
                return true
              }else return false 
            }
            )
            if (dailyweather.length > 0) {
              setWeather(dailyweather[0])
              setDailyWeather(true)
            } else {
              setWeather(weather[0])
              setDailyWeather(false)
            }
          }
        )
      })
    }
    
    
    //Convert epoch to ISO
    const timeconverter = (time) => {
      let myDate = new Date(time)
      let shortend = myDate.getTime()/1000
      return shortend;
    }

    //Query for events of friends and currentuser
    let friendEvents = []
    const getEvents = () => {
        return getUserFriends(loggedInUser).then(friends => {
          friends.forEach(friend => {
            getEventsById(friend.user.id).then(
              events => {
                friendEvents = friendEvents.concat(events)
                })
            .then(() => getEventsById(loggedInUser)
            .then(events => { 
              let allEvents = []
              let futureEvents = []
              allEvents = friendEvents.concat(events)
              const sortedEvents = allEvents.sort(compareValues('eventdate', 'asc'))
              futureEvents = sortedEvents.filter(event => timeconverter(event.eventdate)  > Date.now()/1000)
              setEvents(futureEvents)
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
        <section className="event-style">
            <section className="event-content">
                <button type="button" 
                        className="article-btn"
                        onClick={() => {history.push('/events/create')}}>New Event
                        </button>
            </section>
            {weather?.dt > 0 ? <WeatherCard daily={weather} dailyWeather={dailyWeather}/> : ""}
            <div className="event-cards">
                {events.map( (event, index) => <EventCard event={event}
                                                key={event.id}
                                                index={index}
                                                loggedInUser={loggedInUser}
                                                deleteSetEvent={deleteSetEvent}
                                                getDailyWeather={getDailyWeather} />)} 
            </div>
        </section>
        </>
    )
} 