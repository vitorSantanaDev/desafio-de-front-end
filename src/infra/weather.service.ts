import { IWeather } from 'interfaces/weather.interface'
import axios from 'axios'

type TodayForecast = {
  time: string
  temperature: number
  icon: string
}

export class WeatherService {
  static async getWeather(city: string): Promise<IWeather> {
    const currentResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/current.json?key=${process.env.NEXT_PUBLIC_API_SECRET_KEY}&q=${city}`
    )

    const forecastResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/forecast.json?key=${process.env.NEXT_PUBLIC_API_SECRET_KEY}&q=${city}`
    )

    const timeSlots = {
      '03:00': 'Dawn',
      '09:00': 'Morning',
      '15:00': 'Afternoon',
      '21:00': 'Night'
    }

    const filteredTemperatures = (hours: TodayForecast[]) => {
      return hours.filter(({ time }) =>
        Object.keys(timeSlots).includes(time?.split(' ')[1])
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const todayForecastMapper = (hours: any[]) => {
      return hours.map((item) => {
        const hourFormatted = item.time.split(' ')[1] as keyof typeof timeSlots

        return {
          ...(timeSlots[hourFormatted] && {
            timeSlot: timeSlots[hourFormatted]
          }),
          hour: hourFormatted,
          temperature: item.temp_c,
          icon: item.condition.icon
        }
      })
    }

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
      todayForecast: todayForecastMapper(
        filteredTemperatures(forecastResponse.data.forecast.forecastday[0].hour)
      )
    }

    return result
  }
}
