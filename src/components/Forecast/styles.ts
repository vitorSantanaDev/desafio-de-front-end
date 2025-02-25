import { EClimate } from 'constants/climate.enum'
import styled, { css } from 'styled-components'

type WrapperProps = {
  $climate: EClimate
}

export const TodayForecast = styled.div<Pick<WrapperProps, '$climate'>>`
  ${({ theme, $climate }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    justify-content: center;
    gap: ${theme.spacings.medium};
    padding: ${theme.spacings.small};
    margin-top: ${theme.spacings.medium};
    overflow: hidden;
    background-color: ${$climate === EClimate.Sunny
      ? theme.colors.blueLight
      : theme.colors.blueDark};

    > section {
      width: 100%;
      display: flex !important;
      align-items: center;
      gap: ${theme.spacings.medium};
      justify-content: space-between;
    }

    .sliderContainer {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: ${theme.spacings.medium};
    }

    h3 {
      color: ${theme.colors.white};
      font-weight: 600;
      font-size: ${theme.font.sizes.medium};
    }

    p {
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.medium};
    }
  `}
`

export const ForecastItemsWrapper = styled.div``

export const ForecastItem = styled.div<
  Pick<WrapperProps, '$climate'> & { $current: boolean }
>`
  ${({ theme, $current, $climate }) => css`
    border-radius: 20px;
    gap: ${theme.spacings.small} !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    padding: ${theme.spacings.medium} !important;
    ${$current &&
    css`
      border: 2px solid
        ${$climate === EClimate.Rainy
          ? theme.colors.blueLight
          : theme.colors.blueDark};
    `}
  `}
`
