import { Listbox } from '@headlessui/react'
import { IPlayer } from "../../models/playerModel"
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface IProps {
  value: IPlayer,
  onChange: (e: IPlayer) => void,
  optionArray: IPlayer[],
  isEditing?: boolean
}

const SelectDropdown = ({ value, onChange, optionArray, isEditing = true }: IProps) => {
  return (
    <Listbox value={value} onChange={onChange} disabled={!isEditing}>
      <Listbox.Button className="relative w-full rounded-lg py-2 pl-3 pr-10 text-left shadow-md sm:text-sm">
        {value.playerName}
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>
      <Listbox.Options
        className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg sm:text-sm">
        {optionArray.map((option, index) => (
          <Listbox.Option
            key={index}
            value={option}
            className={({ active }) =>
              `relative cursor-pointer select-none py-2 pl-10 pr-4 
              ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}
              `
            }
          >
            {option.playerName}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default SelectDropdown