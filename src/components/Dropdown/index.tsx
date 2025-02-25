import { useState } from 'react'
import { ChevronDown } from '@styled-icons/boxicons-regular'
import { DropdownProps } from './types'
import { useTheme } from 'styled-components'

import * as S from './styles'

const Dropdown = ({
  icon,
  options,
  selectedOption,
  onChangeSelectedOption
}: DropdownProps) => {
  const { colors } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenDropdown = () => setIsOpen((prevState) => !prevState)

  return (
    <S.Wrapper isOpen={isOpen}>
      <S.IconWrapper onClick={handleOpenDropdown}>
        {icon} <S.SelectedOption>{selectedOption.value}</S.SelectedOption>{' '}
        <ChevronDown color={colors.white} size={24} />
      </S.IconWrapper>
      <S.Content>
        {options.map((option) => (
          <S.Option
            onClick={() => {
              onChangeSelectedOption(option)
              handleOpenDropdown()
            }}
            key={option.value}
          >
            <span>{option.value}</span>
          </S.Option>
        ))}
      </S.Content>
      <S.Overlay aria-hidden={!isOpen} onClick={handleOpenDropdown} />
    </S.Wrapper>
  )
}
export { Dropdown }
