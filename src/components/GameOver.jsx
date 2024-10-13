import { stages } from "../stages";
import PropTypes from "prop-types";

const GameOver = ({ setGameStage, score, setScore }) => {
  const retry = () => {
    setScore(0);

    setGameStage(stages[0].name);
  };

  return (
    <div className="my-36 flex flex-col items-center">
      <h1 className="mb-4 text-6xl font-bold text-white">Fim de jogo!</h1>
      <h2 className="mb-8 text-3xl text-white">
        A pontuação foi: <span className="text-amber-200">{score}</span>
      </h2>
      <button className="button" onClick={retry}>
        Tentar novamente
      </button>
    </div>
  );
};

GameOver.propTypes = {
  setGameStage: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
};

export default GameOver;
