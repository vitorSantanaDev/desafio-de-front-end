import { IWeather } from 'interfaces/weather.interface'
import axios from 'axios'

export class WeatherService {
  static async getWeather(city: string): Promise<IWeather> {
    const currentResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/current.json?key=${process.env.NEXT_PUBLIC_API_SECRET_KEY}&q=${city}`
    )

    const forecastResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/forecast.json?key=${process.env.NEXT_PUBLIC_API_SECRET_KEY}&q=${city}`
    )

    const result: IWeather = {
      city: currentResponse.data.location.name,
      temperature: currentResponse.data.current.temp_c,
      maxTemperature:
        forecastResponse.data.forecast.forecastday[0].day.maxtemp_c,
      minTemperature:
        forecastResponse.data.forecast.forecastday[0].day.mintemp_c,
      precipitation: currentResponse.data.current.precip_mm,
      humidity: currentResponse.data.current.humidity,
      windSpeed: currentResponse.data.current.wind_kph,
      todayForecast: forecastResponse.data.forecast.forecastday[0].hour.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => {
          const hourFormatted = item.time.split(' ')[1]
          return {
            hour: hourFormatted,
            temperature: item.temp_c,
            icon: item.condition.icon
          }
        }
      )
    }

    return result
  }
}
