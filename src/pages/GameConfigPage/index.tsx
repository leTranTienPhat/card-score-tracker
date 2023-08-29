import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IPlayer } from "../../models/playerModel";
import { IGame } from "../../models/gameModel";
import { hasDuplicateNames } from "../../utils/smallUtils";
import PlayerName from "./components/PlayerName";
import Button from "../../components/Button/Button";
import { IMatchData, defaultMatchData } from "../../models/matchModel";

interface IRouterState {
  selectedGame: IGame;
}

const GameConfigPage = () => {
  const { gameName } = useParams();
  const { state } = useLocation();
  const { selectedGame } = state as IRouterState;

  const [matchData, setMatchData] = useState<IMatchData>(defaultMatchData);

  const [numberOfPlayer, setNumberOfPlayer] = useState<string | number>(
    selectedGame.recommendNumberOfPlayer
  );
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMatchData = localStorage.getItem(`${gameName}-match-data`);

    if (storedMatchData) {
      setIsGameRunning(true);
      const matchDataParsedFromStorage = JSON.parse(storedMatchData);
      setMatchData(matchDataParsedFromStorage);
      setNumberOfPlayer(matchDataParsedFromStorage.playerList.length);
    } else {
      const newPlayerList: IPlayer[] = [];
      for (
        let playerCount = 0;
        playerCount < selectedGame.recommendNumberOfPlayer;
        playerCount++
      ) {
        const newPlayer = {
          playerId: playerCount,
          playerName: `Player ${playerCount + 1}`,
        };
        newPlayerList.push(newPlayer);
      }
      const newCurrentScore = Array(newPlayerList.length).fill(0);

      const newMatchData = {
        ...defaultMatchData,
        playerList: newPlayerList,
        currentScore: newCurrentScore,
      };
      setMatchData(newMatchData);
    }
  }, [selectedGame, gameName]);

  const changePlayerName = (playerId: number, newName: string): void => {
    const newPlayerList = [...matchData.playerList];
    newPlayerList[playerId].playerName = newName;

    setMatchData({ ...matchData, playerList: newPlayerList });
  };

  const resetPlayerScore = () => {
    const numberOfPlayers = matchData.playerList.length;
    setMatchData({
      ...matchData,
      currentScore: Array(numberOfPlayers).fill(0),
    });
    localStorage.setItem(
      `${gameName}-match-data`,
      JSON.stringify({
        ...matchData,
        currentScore: Array(numberOfPlayers).fill(0),
        history: [],
      })
    );
  };

  const updatePlayerList = () => {
    const newPlayerList = [...matchData.playerList];
    let numOfNewPlayers = Number(numberOfPlayer) - newPlayerList.length;

    while (numOfNewPlayers !== 0) {
      if (numOfNewPlayers > 0) {
        const newPlayerId = newPlayerList.length;
        newPlayerList.push({
          playerId: newPlayerId,
          playerName: `Player ${newPlayerId + 1}`,
        });
        numOfNewPlayers--;
      } else {
        newPlayerList.pop();
        numOfNewPlayers++;
      }
    }

    setMatchData({ ...matchData, playerList: newPlayerList });
  };

  const onStartGameBtn = () => {
    if (isGameRunning) {
      const warningText =
        "Băt đầu game mới sẽ xóa dữ liệu của game cũ, bạn có chắc muốn bắt đầu game mới không?";
      if (!confirm(warningText)) return;
    }

    const duplicatedNames = hasDuplicateNames(matchData.playerList);
    if (duplicatedNames) {
      const [names] = duplicatedNames.values();
      alert(`Duplicate ${names}`);
      return;
    }

    resetPlayerScore();
    setIsGameRunning(true);
    navigate(`/score/${gameName}`, { state: { selectedGame } });
  };

  const onContinueBtn = () => {
    navigate(`/score/${gameName}`, { state: { selectedGame } });
  };

  const onCancelGameBtn = () => {
    localStorage.removeItem(`${gameName}-match-data`);
    location.reload();
  };

  return (
    <div>
      <div>
        <h1>
          {selectedGame.name}
          {isGameRunning && " (Game đang tiếp diễn)"}
        </h1>
      </div>

      <div>Số lượng người chơi: </div>
      <input
        type="number"
        className="border-2 border-red-500"
        value={numberOfPlayer}
        onChange={(e) => setNumberOfPlayer(e.target.value)}
        onBlur={() => updatePlayerList()}
      />

      <div>
        {matchData.playerList.map((player) => {
          return (
            <PlayerName
              key={player.playerId}
              player={player}
              changePlayerName={changePlayerName}
            />
          );
        })}
      </div>

      <div>
        <Button onClick={() => onStartGameBtn()}>
          {isGameRunning ? <span>Bắt đầu game mới</span> : <span>Bắt đầu</span>}
        </Button>

        {isGameRunning && (
          <>
            <Button onClick={() => onContinueBtn()}>
              <span>Tiếp tục</span>
            </Button>
            <Button onClick={() => onCancelGameBtn()}>
              <span>Hủy trận đấu</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default GameConfigPage;
