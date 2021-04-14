//Logan Demmy - Entry form for new Articles

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createEvent } from "../../modules/eventsManager"

export const EventEntry = () => {
    const [events, setEvent] = useState({
        userId: JSON.parse(sessionStorage.getItem("nutshell_user")),
    }) 

    const history = useHistory();

    const handleInputChange = (event) => {
        const newEvent = {...events};
        let selectedValue = event.target.value
        newEvent[event.target.id] = selectedValue
        setEvent(newEvent)
    }

    const handleSaveEvent = (click) => {
        click.preventDefault()
        console.log(events)
        createEvent(events).then(() => history.push('/events'))
    }

    const handleCancelSave = (click) => {
        click.preventDefault()
        history.push('/events')
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
                            required
                            className="eventform"
                            placeholder="Title"
                            value={events.title} />
                </div>
                <div>   
                    <label htmlFor="message">Event Description</label>
                    <input  type="text" 
                            id="message" 
                            required
                            onChange={handleInputChange} 
                            className="eventform"
                            placeholder="message"
                            value={events.message} />
                </div>
                <div>  
                    <label htmlFor="locations">Event Location</label>
                    <input  type="text" 
                            id="location" 
                            required
                            onChange={handleInputChange} 
                            className="eventform"
                            placeholder="location"
                            value={events.location} />
                </div>
                <div>  
                    <label htmlFor="eventdate">Event Date</label>
                    <input  type="datetime-local" 
                            id="eventdate" 
                            required
                            onChange={handleInputChange} 
                            className="eventform"
                            value={events.eventdate} />
                </div>
                <div> 
                    <label htmlFor="eventtime">Event Time</label>
                    <input  type="time" 
                            id="eventtime" 
                            required
                            onChange={handleInputChange} 
                            className="eventform"
                            value={events.eventtime} />                 
                </div>
            </fieldset>
            <button className="btn btn-primary"
				onClick={handleSaveEvent}>
				Save Entry
            </button>
            <button className="btn btn-primary"
				onClick={handleCancelSave}>
				Cancel
            </button>
        </form>
    )
}