import React , {Component} from 'react';

import Title from './components/Title.js';
import Form from './components/Form.js';
import Weather from './components/Weather.js';

const api_key = "9351338d841eaf9f9ec1c4721143aca3";

export default class App extends Component{
  state = {
    temperature : undefined,
    city:undefined,
    country:undefined,
    humidity:undefined,
    description:undefined,
    error:undefined
  }
  getweather = async(e) => {
    e.preventDefault();
    let city = e.target.elements.city.value;
    let country = e.target.elements.country.value;
    if(city && country){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${api_key}`);
      const data = await api_call.json();
      console.log("data ::",data);
      if(data.cod === 200)
      this.setState({
        temperature :data.main.temp ,
        city:data.name,
        country:data.sys.country,
        humidity:data.main.humidity,
        description:data.weather[0].description
      });
      else
      this.setState({
        temperature :undefined,
        city:undefined,
        country:undefined,
        humidity:undefined,
        description:undefined,
        error:data.message
      });
    }
    else{
      this.setState({
        temperature :undefined,
        city:undefined,
        country:undefined,
        humidity:undefined,
        description:undefined,
        error:" Please enter city and country ."
      });
    }
  }
  render(){
    let {
      temperature,
      city,
      country,
      humidity,
      description,
      error
    } = this.state;
    return (
      <div> 
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
            <div className="col-xs-5 title-container">
              <Title/>
            </div>
            <div className="col-xs-7 form-container">
            <Form getweather={this.getweather}/>
            <Weather temp={temperature} city={city} country={country} humidity={humidity} description={description} error={error}/>
            </div>
            </div>
          </div>
        </div>
      </div>


      </div>
    )
  }
}
