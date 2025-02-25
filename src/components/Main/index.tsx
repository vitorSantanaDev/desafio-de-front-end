import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Dropdown } from 'components/Dropdown'
import { Forecast } from 'components/Forecast'
import { Map } from '@styled-icons/boxicons-regular'

import { ISelect } from 'interfaces/select.interface'
import { useTheme } from 'styled-components'

import { WeatherService } from 'infra/weather.service'
import { IWeather } from 'interfaces/weather.interface'
import { EClimate } from 'constants/climate.enum'

import * as S from './styles'

const CITIES: ISelect[] = [
  { label: 'Dallol (NG)', value: 'Dallol' },
  { label: 'Fairbanks (US)', value: 'Fairbanks' },
  { label: 'Londres (GB)', value: 'Londres' },
  { label: 'Recife (BR)', value: 'Recife' },
  { label: 'Vancouver (CA)', value: 'Vancouver' },
  { label: 'Yakutsk (RU)', value: 'Yakutsk' }
]

const Main = () => {
  const { colors } = useTheme()
  const [weather, setWeather] = useState<IWeather | null>(null)

  const [selectedOption, setSelectedOption] = useState<ISelect>(CITIES[0])

  const isSunny =
    Number(weather?.temperature) > 27 && new Date().getHours() < 18

  function handleChangeSelectedOption(option: ISelect) {
    setSelectedOption(option)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await WeatherService.getWeather(selectedOption.value)
      setWeather(data)
    }

    fetchData()
  }, [selectedOption.value])

  return (
    <S.Wrapper $climate={isSunny ? EClimate.Sunny : EClimate.Rainy}>
      <S.Container>
        <S.Header>
          <Dropdown
            options={CITIES}
            selectedOption={selectedOption}
            icon={<Map color={colors.white} size={27} />}
            onChangeSelectedOption={handleChangeSelectedOption}
          />
        </S.Header>
        <S.Content>
          <S.IllustrationWrapper>
            <Image
              src={isSunny ? '/img/sunny.svg' : '/img/rainy.svg'}
              width={287}
              height={207}
              alt="Illustration"
            />
          </S.IllustrationWrapper>
          <S.Temperature>{weather?.temperature}°</S.Temperature>
          <S.Preciptations>Previsões</S.Preciptations>
          <S.PreciptationsWrapper>
            <S.Preciptations>Max: {weather?.maxTemperature}</S.Preciptations>
            <S.Preciptations>Max: {weather?.maxTemperature}</S.Preciptations>
          </S.PreciptationsWrapper>
          <S.AdditionalInfoWrapper
            $climate={isSunny ? EClimate.Sunny : EClimate.Rainy}
          >
            <div>
              <Image src={'/img/rain.svg'} width={24} height={24} />
              <S.AdditionalInfoText>{weather?.humidity}%</S.AdditionalInfoText>
            </div>
            <div>
              <Image src={'/img/humidity.svg'} width={24} height={24} />
              <S.AdditionalInfoText>{weather?.humidity}%</S.AdditionalInfoText>
            </div>
            <div>
              <Image src={'/img/wind.svg'} width={24} height={24} />
              <S.AdditionalInfoText>
                {weather?.windSpeed} km/h
              </S.AdditionalInfoText>
            </div>
          </S.AdditionalInfoWrapper>
          {weather && <Forecast weather={weather} />}
        </S.Content>
      </S.Container>
    </S.Wrapper>
  )
}

export default Main
