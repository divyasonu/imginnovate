import axios from 'axios'


const APIKEY= '0cf9b1e00fdd890dbabcde18a9a8f4fa'
export const getWetherData =async(city)=>{
    console.log(city,"city name")
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}`)
    console.log(response,"response")
    return response.data
}