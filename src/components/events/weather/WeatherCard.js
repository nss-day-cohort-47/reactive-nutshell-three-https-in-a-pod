//Logan Demmy - card for weather

import React from 'react'

export const WeatherCard = ({daily, dailyWeather}) => {
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
            <h2>Weather Report</h2>
            {dailyWeather ? <p>Projected weather for your event is:</p> : <p>Sadly we are only human and cannot predict the weather for your date, today's weather is</p>}
            <h3> {timeconverter(daily?.dt)} </h3>
            <p> High: {tempConvert(daily?.temp.max)}&deg;  Low: {tempConvert(daily?.temp.min)}&deg;</p>
            <p> Conditions: {daily?.weather[0].description} </p>
        </div>
    )
}