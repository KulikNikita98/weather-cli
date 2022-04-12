import https from 'https';

import { getKeyValue, TOKEN_DICTIONARY  } from "./storage.services.js"

const getCoordinates = async (city) => {
  if (!city) {
    throw new Error ('Выберите, пожалуйста, город')
  }
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  if (!token) {
    throw new Error ('Не задан ключ API, задайте его через команду -t [API_KEY]')
  }
  const url = new URL('https://api.openweathermap.org/geo/1.0/direct')
  url.searchParams.append('q', city)
  url.searchParams.append('limit', 1)
  url.searchParams.append('appid', token)
  https.get(url, (response)=> {
    let data = ''

    response.on('data', (chunck)=> {
      data+=chunck;
    });
    response.on('end', async ()=> {
      const [{lat,lon}] = JSON.parse(data)
       console.log(data)
       console.log(lat,lon)
      await getWeather(lat, lon)
    })
  })
}

const getWeather = async (lat, lon) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  if (!token) {
    throw new Error ('Не задан ключ API, задайте его через команду -t [API_KEY]')
  }
  const url = new URL('https://api.openweathermap.org/data/2.5/weather')

  url.searchParams.append('appid', token)
  url.searchParams.append('lat', lat)
  url.searchParams.append('lon', lon)
  url.searchParams.append('lang', 'ru')
  url.searchParams.append('units', 'metric')

  https.get(url, (response)=> {
    let data = ''

    response.on('data', (chunck)=> {
      data+=chunck;
    });
    response.on('end', ()=> {
      console.log(data);
    })
  })
}


export { getCoordinates }