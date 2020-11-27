import React from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';

// api call api.openweathermap.org/data/2.5/weather?q=London,uk
const API_KEY = "86662505f109992d97e0f95dfae5dc1a";

// const getWeather = async ({lat, long}) => {
//   const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`);

//   const response = await api_call.json();

//   console.log(response);
// }

// const getCoord = () =>{
//   navigator.geolocation.getCurrentPosition(function(position) {
//     var lat = position.coords.latitude;
//     var long = position.coords.longitude;
//     console.log(lat, long);

//     // getWeather({lat, long});

//   });
// }



class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      lat: 10,
      long: 10,

      city: undefined,
      country: undefined,
      condition: undefined,
      currentTemp: undefined,
      maxTemp: undefined,
      minTemp: undefined,
      feels_like: undefined,
      icon: undefined,

    };
    // this.getCoord();
    this.getCoord = this.getCoord.bind(this);

    navigator.geolocation.getCurrentPosition(this.getCoord); 
    if(navigator){
      setTimeout(() => {
        this.getWeather();
      }, 4500);

    }

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Sunny: "wi-day-sunny",
      Cloudy: "wi-day-fog",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Rain: "wi-storm-showers",
      Drizzle: "wi-sleet",
    }

  }


  componentDidMount() {
  }


  getCoord = async (position) =>{
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      console.log(lat, long);
  
      this.state.lat = lat;
      this.state.long = long;

  }

  toF(temp){
    let fahr = Math.floor(temp * 1.8 - 459.67);
    return fahr;
  }

  getWeatherIcon(icons, rangeId){
    switch(true){
      case rangeId >= 200 && rangeId <= 232:
        this.setState({icon: this.weatherIcon.Thunderstorm});
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({icon: this.weatherIcon.Drizzle});
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({icon: this.weatherIcon.Rain});
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({icon: this.weatherIcon.Snow});
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({icon: this.weatherIcon.Atmosphere});
        break;
      case rangeId === 800:
        this.setState({icon: this.weatherIcon.Sunny});
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({icon: this.weatherIcon.Cloudy});
        break;

      default: return this.weatherIcon.Sunny;
      
    }
  }

  getWeather = async () => {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&appid=${API_KEY}`);
  
    const response = await api_call.json();
  
    console.log(response);
    this.setState({
      city: response.name,
      country: response.sys.country,
      condition: response.weather[0].main,
      currentTemp: this.toF(response.main.temp),
      maxTemp: this.toF(response.main.temp_max),
      minTemp: this.toF(response.main.temp_min),
      feels_like: this.toF(response.main.feels_like)
    })

    this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
  };



  render(){
    return (
      <div className="App">
        <Header />
        <WeatherCard 
        city={this.state.city} 
        country={this.state.country} 
        condition={this.state.condition} 
        current={this.state.currentTemp} 
        min={this.state.minTemp} 
        max={this.state.maxTemp} 
        feelsLike={this.state.feels_like} 
        weatherIcon={this.state.icon} />
      </div>
    );
  }
}


export default App;