//Logan Demmy - Form to edit and commit changes to events

import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { editEvent, getEventById } from '../../modules/eventsManager'

export const EventEditForm = () => {
    const [event, setEvent] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const {eventId} = useParams();
    const history = useHistory();

    const handleFieldChange = evt => {
        const stateToChange = {...event}
        stateToChange[evt.target.id] = evt.target.value;
        setEvent(stateToChange)
    }

    const updateExistingEvent = evt =>{
        evt.preventDefault()
        setIsLoading(true)

        const editedEvent = {
            id: eventId,
            userId: event.userId,
            title: event.title,
            message: event.message,
            eventdate: event.eventdate,
            eventtime: event.eventtime,
            location:  event.location
        };
        editEvent(editedEvent)
        .then(() => history.push("/events"))
    }

    const handleCancelSave = (click) => {
        click.preventDefault()
        history.push('/events')
    }

    useEffect(() => {
        getEventById(eventId)
            .then(event => {
                setEvent(event);
                setIsLoading(false)
            })
    }, [eventId])

    return (
        <>
            <form>
                <fieldset>
                    <h2>Edit Event</h2>
                <div className="eventform-group">
                    <label htmlFor="title">Event Title</label>
                    <input  type="text" 
                            id="title" 
                            onChange={handleFieldChange} 
                            autoFocus 
                            required
                            className="form-control"
                            placeholder="Title"
                            value={event.title} />
                </div>
                <div className="eventform-group">   
                    <label htmlFor="message">Event Description</label>
                    <input  type="text" 
                            id="message" 
                            required
                            onChange={handleFieldChange} 
                            className="form-control"
                            placeholder="message"
                            value={event.message} />
                </div>
                <div className="eventform-group">  
                    <label htmlFor="locations">Event Location</label>
                    <input  type="text" 
                            id="location" 
                            required
                            onChange={handleFieldChange} 
                            className="form-control"
                            placeholder="location"
                            value={event.location} />
                </div>
                <div className="eventform-group">  
                    <label htmlFor="eventdate">Event Date</label>
                    <input  type="datetime-local" 
                            id="eventdate" 
                            required
                            onChange={handleFieldChange} 
                            className="form-control"
                            value={event.eventdate} />
                </div>
                {/* <div> 
                    <label htmlFor="eventtime">Event Time</label>
                    <input  type="time" 
                            id="eventtime" 
                            required
                            onChange={handleFieldChange} 
                            className="eventform"
                            value={event.eventtime} />                 
                </div> */}
                <div>
                    <button
                        type="button" disabled={isLoading}
                        onClick={updateExistingEvent}
                        className="btn btn-primary"
                    >Submit</button>
                </div>
                <button className="btn btn-primary"
				    onClick={handleCancelSave}>
				    Cancel
                </button>
                </fieldset>
            </form>
        </>
    )
}