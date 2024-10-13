import { stages } from "./stages";
import { useState } from "react";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-indigo-900">
      <div className="container m-auto flex justify-center">
        {"start" === gameStage && <StartScreen setGameStage={setGameStage} />}

        {"playing" === gameStage && (
          <Game setGameStage={setGameStage} score={score} setScore={setScore} />
        )}

        {"end" === gameStage && (
          <GameOver
            setGameStage={setGameStage}
            score={score}
            setScore={setScore}
          />
        )}
      </div>
    </div>
  );
}

export default App;
