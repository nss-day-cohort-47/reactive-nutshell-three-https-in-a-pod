//Logan Demmy - Entry form for new Articles

import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { createEvent } from "../../modules/eventsManager"

export const EventEntry = () => {
    const [events, setEvent] = useState({
        id: "",
        userId: JSON.parse(sessionStorage.getItem("nutshell_user")),
    }) 

    const history = useHistory();

    const handleInputChange = (event) => {
        const newEvent = {...events};
        let selectedValue = event.target.selectedValue
        if (event.target.id.includes("Id")) {
            selectedValue = parseInt(selectedValue)
        }
        newEvent[event.target.id] = selectedValue
        setEvent(newEvent)
    }

    const handleSaveEvent = (click) => {
        click.preventDefault()
        console.log(events)
        createEvent(events).then(() => history.push('/events'))
    }


    return (
        <form className="eventform">
            <h3 className="eventform-title"> New Event</h3>
            <fieldset>
                <div className="eventform-group">
                    <label htmlFor="title">Event Title</label>
                    <input  type="text" 
                            id="title" 
                            onChange={handleInputChange} 
                            autoFocus 
                            className="eventform"
                            placeholder="Title"
                            value={events.title} />
                </div>
                <div>   
                    <label htmlFor="message">Event Description</label>
                    <input  type="text" 
                            id="message" 
                            onChange={handleInputChange} 
                            className="eventform"
                            placeholder="message"
                            value={events.message} />
                </div>
                <div>  
                    <label htmlFor="locations">Event Location</label>
                    <input  type="text" 
                            id="location" 
                            onChange={handleInputChange} 
                            className="eventform"
                            placeholder="location"
                            value={events.location} />
                </div>
                <div>  
                    <label htmlFor="eventdate">Event Date</label>
                    <input  type="date" 
                            id="eventdate" 
                            onChange={handleInputChange} 
                            className="eventform"
                            value={events.eventdate} />
                </div>
                <div> 
                    <label htmlFor="eventtime">Event Time</label>
                    <input  type="time" 
                            id="eventtime" 
                            onChange={handleInputChange} 
                            className="eventform"
                            value={events.eventtime} />                 
                </div>
            </fieldset>
            <button className="btn btn-primary"
				onClick={handleSaveEvent}>
				Save Entry
            </button>
        </form>
    )
}