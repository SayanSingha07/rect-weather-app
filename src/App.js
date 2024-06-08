import React, { useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import CityComponent from "./modules/CityComponent";
import WeatherComponent from "./modules/WeatherInfoComponent";
import CityChip from "./modules/CityChip";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
`;

const WeatherCardContainer = styled.div`
  display: inline-block; /* Ensures items stay in a row */
  white-space: normal; /* Allows content to wrap within items */
  width: 380px;
  padding: 20px 10px;
  margin: 20px 10px;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
`;
const WeatherBoard = styled.div`
  display: grid;
  grid-auto-flow: column;
  overflow-x: auto;
`

function App() {
  const [city, updateCity] = useState();
  const [weatherDataSet, updateWeatherDataSet] = useState([]);

  const fetchWeather = async (e) => {
    e.preventDefault();
    if(weatherDataSet.length >= 3) {
      return alert("Max 3 cities can be viewed simentounsly, Please remove one atleast")
    }
    try{
      const response = await Axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`,
      );
      updateWeatherDataSet(oldData => [...oldData, {
        city,
        data: response.data
      }])
      updateCity("")
    }catch (e) {
      alert("City not found");
    }

  };
  const removeCity = (removeIndex) => {
    updateWeatherDataSet(weatherDataSet.filter((item, index) => index !== removeIndex))
  }
  return (
      <>
        <Container>
          <CityComponent city={city} updateCity={updateCity} fetchWeather={fetchWeather} />
          <CityChip weatherDataSet={weatherDataSet} removeCity={removeCity} />
        </Container>
        {<WeatherBoard >
          {weatherDataSet.map(({city, data}) => <WeatherCardContainer><WeatherComponent weather={data} city={city} /></WeatherCardContainer>)}
        </WeatherBoard>}
        </>
  );
}

export default App;
