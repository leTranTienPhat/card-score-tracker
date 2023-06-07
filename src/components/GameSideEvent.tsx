import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { IPlayer } from "../models/playerModel"
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { ISideEvent } from '../models/matchModel'

interface IProps {
  playerList: IPlayer[],
  sideEvent: ISideEvent,
  updateSideEvents: (sideEvent: ISideEvent[]) => void,
  removeSideEvent: (idx: number) => void,
}

const GameSideEvent = ({ playerList, sideEvent, updateSideEvents, removeSideEvent }: IProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer[]>([])

  const handleOnChange = (e: IPlayer[]) => {
    console.log(sideEvent)
    setSelectedPlayer(e)
  }

  return (
    <div className="my-10 flex">
      <div>
        <select name="cars" id="cars">
          {playerList.map(player => {
            return (
              <option key={player.playerId} value={player.playerId}>{player.playerName}</option>
            )
          })}
        </select>
        <input className="border-2 border-red-200" />
      </div>

      <div className="relative">
        <Listbox value={selectedPlayer} onChange={handleOnChange} multiple>

          <Listbox.Button className="relative w-full rounded-lg  py-2 pl-3 pr-10 text-left shadow-md sm:text-sm">
            {selectedPlayer.map((player) => player.playerName).join(', ')}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg sm:text-sm">
            {playerList.map((player, index) => (
              <Listbox.Option key={player.playerId} value={player}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
              >
                {({ selected }) => (
                  <div>
                    {player.playerName}
                    {selected && <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>}
                  </div>
                )}

              </Listbox.Option>

            ))}
          </Listbox.Options>
        </Listbox>
        <input className="border-2 border-red-200" />
        {/* <button onClick={() => removeSideEvent(index)}>Remove</button> */}
      </div>
    </div>
  )
}

export default GameSideEvent