export interface IWeather {
  city: string
  temperature: number
  maxTemperature: number
  minTemperature: number
  precipitation: number
  humidity: number
  windSpeed: number
  todayForecast: {
    hour: string
    temperature: number
    icon: string
  }[]
}
