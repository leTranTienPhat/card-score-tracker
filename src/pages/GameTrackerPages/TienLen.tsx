import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IPlayer } from "../../models/playerModel";
import RoundRanking from "../../components/RoundRanking";
import { swapValues } from "../../utils/smallUtils";
import GameSideEvent from "../../components/GameSideEvent";
import {
  IMatchData,
  IMatchHistory,
  ISideEvent,
  defaultMatchData,
} from "../../models/matchModel";
import Button from "../../components/Button/Button";
import { ModalContext } from "../../context/ModalContext";
import HistoryList from "../../components/HistoryList";

const TienLen = () => {
  const [matchData, setMatchData] = useState<IMatchData>(defaultMatchData);
  const [roundRankingList, setRoundRankingList] = useState<
    Array<number | null>
  >([]);
  const [sideEvents, setSideEvents] = useState<ISideEvent[]>([]);
  const [currentRoundScore, setCurrentRoundScore] = useState<number[]>([]);
  const modalContext = useContext(ModalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMatchData = localStorage.getItem(`tien-len-match-data`);
    if (storedMatchData) {
      setMatchData(JSON.parse(storedMatchData));
      setRoundRankingList(Array(4).fill(null));
      setCurrentRoundScore(Array(4).fill(0));
    } else navigate("/");
  }, [navigate]);

  const updateRoundRanking = (idx: number, playerId: number) => {
    let newRoundRankingList = [...roundRankingList];

    //Case 1: User select the same player in the same place
    if (roundRankingList[idx] === playerId) {
      return;
    }

    //Case 2: User select the player that currently exist in another place
    if (roundRankingList.includes(playerId)) {
      const swapPlaceIdx = roundRankingList.indexOf(playerId);
      newRoundRankingList = swapValues(roundRankingList, idx, swapPlaceIdx);
      setRoundRankingList(newRoundRankingList);
      return;
    }

    //Case 3: User select the player in an occupied place, but without anywhere to swap to (user selected player doesn't exist yet)
    newRoundRankingList[idx] = playerId;
    setRoundRankingList(newRoundRankingList);
  };

  const updateCurrentRoundScore = (playerId: number, amount: number) => {
    const newCurrentRoundStore = currentRoundScore;
    newCurrentRoundStore[playerId] += amount;
    setCurrentRoundScore([...newCurrentRoundStore]);
  };

  const updatePlayerScoreOnIdx = (
    playerArray: IPlayer[],
    currentScoreArray: number[],
    updatePlayerId: number,
    amount: number
  ) => {
    const updatePlayerIdx = playerArray.findIndex(
      (player) => player.playerId === updatePlayerId
    );
    currentScoreArray[updatePlayerIdx] += amount;
    updateCurrentRoundScore(updatePlayerIdx, amount);
  };

  const scoreCalculateBasedOnSideEvents = (matchDataObj: IMatchData) => {
    const { playerList, currentScore } = matchDataObj;
    sideEvents.forEach((event) => {
      if (event.gainScore && event.loseScore) {
        updatePlayerScoreOnIdx(
          playerList,
          currentScore,
          event.gainScore.player.playerId,
          event.gainScore.amount
        );
        event.loseScore.player.forEach((player) => {
          if (event.loseScore)
            updatePlayerScoreOnIdx(
              playerList,
              currentScore,
              player.playerId,
              -Math.abs(event.loseScore.amount)
            );
        });
      }
    });
  };

  const generateRoundHistory = (matchDataObj: IMatchData) => {
    const newMatchData = { ...matchDataObj };
    console.log("BEFORE UPDATE: ", newMatchData.history);
    const historyObject: IMatchHistory = {
      roundNo: newMatchData.history.length + 1,
      roundRankingList,
      sideEvents,
      roundScore: currentRoundScore,
    };
    console.log("HISTORY OBJECT: ", historyObject);

    setMatchData({
      ...newMatchData,
      history: [...newMatchData.history, historyObject],
    });
    localStorage.setItem(
      `tien-len-match-data`,
      JSON.stringify({
        ...newMatchData,
        history: [...newMatchData.history, historyObject],
      })
    );
  };

  const scoreCalculate = () => {
    const newMatchData = { ...matchData };
    const { playerList, currentScore } = newMatchData;

    if (sideEvents) scoreCalculateBasedOnSideEvents(newMatchData);

    let score = 2;
    roundRankingList.forEach((playerId) => {
      if (score === 0) score--;
      if (playerId !== null) {
        updatePlayerScoreOnIdx(playerList, currentScore, playerId, score);
      }
      score--;
    });

    generateRoundHistory(newMatchData);
  };

  const addSideEvent = () => {
    const newSideEvents = [...sideEvents];
    newSideEvents.push({
      eventId: crypto.randomUUID(),
    });
    setSideEvents(newSideEvents);
  };

  const updateSideEvents = (eventId: string, newSideEvent: ISideEvent) => {
    const newSideEvents = [...sideEvents];
    const selectedEventIdx = newSideEvents.findIndex(
      (event) => event.eventId === eventId
    );
    newSideEvents[selectedEventIdx] = newSideEvent;
    setSideEvents(newSideEvents);
  };

  const removeSideEvent = (eventId: string) => {
    const newSideEvents = [...sideEvents];
    const removeEventIdx = newSideEvents.findIndex(
      (event) => event.eventId === eventId
    );
    newSideEvents.splice(removeEventIdx, 1);
    setSideEvents(newSideEvents);
  };

  const onFinishRoundBtn = () => {
    scoreCalculate();
    // localStorage.setItem(`tien-len-match-data`, JSON.stringify(matchData));
    setRoundRankingList(Array(4).fill(null));
    setSideEvents([]);
    setCurrentRoundScore(Array(4).fill(0));
  };

  const onFinishGameBtn = () => {
    console.log(matchData);
    // localStorage.clear();
    // navigate('/')
  };

  const clearOneRoundRanking = (idx: number) => {
    const newRoundRankingList = [...roundRankingList];
    newRoundRankingList[idx] = null;
    setRoundRankingList(newRoundRankingList);
  };

  const openHistoryModal = () => {
    modalContext.openModal(<HistoryList />);
  };

  return (
    <div>
      <h1>Tiến lên - Round {matchData.history.length + 1}</h1>
      <button onClick={() => openHistoryModal()}>Open History</button>
      <div>
        {matchData.playerList.map((player) => {
          return (
            <div key={player.playerId}>
              {player.playerName}: {matchData.currentScore[player.playerId]}{" "}
              điểm
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 my-4">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {roundRankingList.map((round, index) => {
          return (
            <RoundRanking
              key={index}
              place={index}
              playerList={matchData.playerList}
              roundRankingList={roundRankingList}
              clearOneRoundRanking={clearOneRoundRanking}
              updateRoundRanking={updateRoundRanking}
            />
          );
        })}
      </div>

      <span
        className="p-2 cursor-pointer border-2 border-black rounded-full"
        onClick={() => addSideEvent()}
      >
        +
      </span>
      {sideEvents.map((sideEvent) => {
        return (
          <GameSideEvent
            key={sideEvent.eventId}
            playerList={matchData.playerList}
            sideEvent={sideEvent}
            updateSideEvents={updateSideEvents}
            removeSideEvent={removeSideEvent}
          />
        );
      })}

      <div>
        <Button onClick={() => onFinishRoundBtn()}>
          <span>Kết thúc hiệp chơi</span>
        </Button>
        <Button onClick={() => onFinishGameBtn()}>
          <span>Log thông tin</span>
        </Button>
      </div>
    </div>
  );
};

export default TienLen;
