import Image from 'next/image'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { ForecastProps } from './types'
import { EClimate } from 'constants/climate.enum'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Slider from 'react-slick'

import * as S from './styles'

const slideSettings = {
  speed: 500,
  arrows: false,
  slidesToShow: 4,
  slidesToScroll: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
      }
    }
  ]
}

export function Forecast({ weather }: ForecastProps) {
  const isSunny =
    Number(weather?.temperature) > 27 && new Date().getHours() < 18

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return (
    <S.TodayForecast $climate={isSunny ? EClimate.Sunny : EClimate.Rainy}>
      <section>
        <h3>Amanhã</h3>
        <p>{format(tomorrow, 'MMM, dd', { locale: ptBR })}</p>
      </section>
      <Slider className="sliderContainer" {...slideSettings}>
        {weather?.todayForecast.map((item) => {
          const currentHour = new Date().getHours()
          const isCurrentHour = Number(item.hour.split(':')[0]) === currentHour

          return (
            <S.ForecastItem
              $current={isCurrentHour}
              key={item.hour}
              $climate={isSunny ? EClimate.Sunny : EClimate.Rainy}
            >
              <p>{item.temperature}°</p>
              <Image
                src={`https:${item.icon}`}
                width={48}
                height={48}
                alt="Weather Icon"
              />
              <p>{item.hour}</p>
            </S.ForecastItem>
          )
        })}
      </Slider>
    </S.TodayForecast>
  )
}
