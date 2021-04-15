//Logan Demmy - card for weather

import React from 'react'

export const WeatherCard = ({daily}) => {
    const timeconverter = (time) => {
        var myDate = new Date(time *1000)
        let shortend = myDate.toLocaleDateString()
        return shortend;
    }

    const tempConvert = (tempK) => {
        let temp = (((tempK-270)*9/5) +32).toFixed(0)
        return temp
    }
    return (
        <div className="dailyweather">
        <h3> {timeconverter(daily.dt)} </h3>
        <p> High: {tempConvert(daily.temp.max)}\u00b0  Low: {tempConvert(daily.temp.min)}\u00b0</p>
        <p> Conditions: {daily.weather[0].description} </p>
    </div>
    )
}