import { EClimate } from 'constants/climate.enum'
import styled, { css } from 'styled-components'

type WrapperProps = {
  $climate: EClimate
}

export const Wrapper = styled.main<WrapperProps>`
  ${({ $climate }) => css`
    background: ${$climate === EClimate.Sunny
      ? 'linear-gradient(to bottom, #29B2DD, #33AADD, #2DC8EA)'
      : 'linear-gradient(to bottom, #08244f, #134cb5, #0b42ab)'};
  `}
  width: 100%;
`

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 3rem;
`

export const IllustrationWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

export const Temperature = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.huge};
    color: ${theme.colors.white};
    margin-bottom: ${theme.spacings.medium};
  `}
`

export const Preciptations = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.medium};
  `}
`

export const PreciptationsWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    margin-top: ${theme.spacings.xsmall};
    gap: ${theme.spacings.xsmall};
    align-items: center;
  `}
`

export const AdditionalInfoWrapper = styled.div<Pick<WrapperProps, '$climate'>>`
  ${({ theme, $climate }) => css`
    width: 100%;
    display: flex;
    border-radius: 20px;
    justify-content: center;
    gap: ${theme.spacings.large};
    margin-top: ${theme.spacings.medium};
    background-color: ${$climate === EClimate.Sunny
      ? theme.colors.blueLight
      : theme.colors.blueDark};
    padding: 1rem;

    div {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  `}
`

export const AdditionalInfoText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.medium};
  `}
`
