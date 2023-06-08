import { useState } from 'react'
import { IPlayer } from "../models/playerModel"
import { ISideEvent } from '../models/matchModel'
import MultipleSelectDropdown from './Dropdown/MultipleSelectDropdown'
import SelectDropdown from './Dropdown/SelectDropdown'
import InputField from './InputField'
import Button from './Button/Button'
import TextAreaField from './TextAreaField'

interface IProps {
  playerList: IPlayer[],
  sideEvent: ISideEvent,
  updateSideEvents: (eventId: string, newSideEvent: ISideEvent) => void,
  removeSideEvent: (eventId: string) => void,
}

const GameSideEvent = ({ playerList, sideEvent, updateSideEvents, removeSideEvent }: IProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(true)

  const [selectedGainPlayer, setSelectedGainPlayer] = useState<IPlayer>(playerList[0])
  const [gainScore, setGainScore] = useState<string>('')
  const [selectedMultiple, setSelectedMultiple] = useState<IPlayer[]>([])
  const [loseScore, setLoseScore] = useState<string>('')
  const [note, setNote] = useState<string>('')

  const toggleEditingMode = () => {
    setIsEditing(!isEditing)
  }

  const handleOnChangeGainPlayer = (e: IPlayer) => {
    setSelectedGainPlayer(e)
    setSelectedMultiple([])
  }

  const onGainScoreChange = (e: React.FormEvent<HTMLInputElement> | undefined) => {
    if (e) setGainScore(e.currentTarget.value)
  }

  const handleOnChangeLosePlayer = (e: IPlayer[]) => {
    setSelectedMultiple(e)
  }

  const onLoseScoreChange = (e: React.FormEvent<HTMLInputElement> | undefined) => {
    if (e) setLoseScore(e.currentTarget.value)
  }

  const handleUpdateSideEvent = (eventId: string) => {
    const sideEventUpdate: ISideEvent = {
      eventId,
      gainScore: {
        player: selectedGainPlayer,
        score: Number(gainScore)
      },
      loseScore: {
        player: selectedMultiple,
        score: Number(loseScore)
      },
      note: note
    }
    toggleEditingMode()
    updateSideEvents(eventId, sideEventUpdate)
  }

  return (
    <div className="my-10 flex">
      <div>
        <SelectDropdown value={selectedGainPlayer} optionArray={playerList} onChange={handleOnChangeGainPlayer} isEditing={isEditing} />
        <InputField value={gainScore} onChange={onGainScoreChange} type="number" placeholder='Số điểm được cộng' isEditing={isEditing} />
      </div>

      <div className="relative">
        <MultipleSelectDropdown value={selectedMultiple} gainPlayer={selectedGainPlayer} onChange={handleOnChangeLosePlayer} optionArray={playerList} isEditing={isEditing} />
        <InputField value={loseScore} onChange={onLoseScoreChange} type="number" placeholder='Số điểm bị trừ' isEditing={isEditing} />
      </div>

      <div>
        <TextAreaField value={note} onChange={setNote} isEditing={isEditing} />
      </div>

      {isEditing
        ?
        <div>
          <Button onClick={() => handleUpdateSideEvent(sideEvent.eventId)}>
            <span>Update</span>
          </Button>

          <Button onClick={() => removeSideEvent(sideEvent.eventId)}>
            <span>Remove</span>
          </Button>
        </div>
        :
        <div>
          <Button onClick={() => toggleEditingMode()}>
            <span>
              Chỉnh sửa
            </span>
          </Button>
        </div>
      }
    </div>
  )
}

export default GameSideEvent