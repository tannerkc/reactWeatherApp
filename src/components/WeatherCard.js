import React from 'react';
import './WeatherCard.css';

function WeatherCard(props) {
    return (
        <div className="weatherCard">
            <h2 className="location">{props.city}</h2>
            <hr />
            <div className="weather">
                <span>
                    <i className={`wi ${props.weatherIcon} wi-day`}></i>
                    <p>{props.condition}</p>
                </span>
                <span>
                    <h3>{props.current}&deg;</h3>
                    <p>Feels like {props.feelsLike}&deg;</p>
                </span>
                
            </div>  

            <div className="weather minmax">
                {minmaxTemp(props.min, props.max)}
            </div> 
        </div>
    )
}

function minmaxTemp(min, max){
    return(
        <h3>
            <span><p>Low of</p> {min}&deg;</span>
            <span><p>High of</p> {max}&deg;</span>
        </h3>
    )
}

export default WeatherCard;
