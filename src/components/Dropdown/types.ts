import { ISelect } from 'interfaces/select.interface'
import { ReactNode } from 'react'

export type DropdownProps = {
  icon: ReactNode
  selectedOption: ISelect
  options: ISelect[]
  onChangeSelectedOption: (option: ISelect) => void
}
