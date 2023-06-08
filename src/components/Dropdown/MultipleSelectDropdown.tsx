import { Listbox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { IPlayer } from '../../models/playerModel'

interface IProps<T> {
  value: T,
  optionArray: T,
  gainPlayer: IPlayer,
  onChange: (e: IPlayer[]) => void,
  isEditing?: boolean
}

const MultipleSelectDropdown = ({ value, optionArray, gainPlayer, onChange, isEditing = true }: IProps<IPlayer[]>) => {
  return (
    <Listbox value={value} onChange={onChange} multiple disabled={!isEditing}>

      <Listbox.Button className="relative w-full rounded-lg  py-2 pl-3 pr-10 text-left shadow-md sm:text-sm">
        {value.map((player) => player.playerName).join(', ')}
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>

      <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg sm:text-sm">
        {optionArray.map((option, index) => (
          <Listbox.Option
            key={index}
            value={option}
            className={({ active, disabled }) =>
              `relative cursor-pointer select-none py-2 pl-10 pr-4 
              ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}
              ${disabled ? 'bg-gray-200 text-slate-400' : ''}
              `
            }
            disabled={option.playerId === gainPlayer.playerId}
          >
            {({ selected }) => (
              <>
                {option.playerName}
                {selected && <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>}
              </>
            )}

          </Listbox.Option>

        ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default MultipleSelectDropdown