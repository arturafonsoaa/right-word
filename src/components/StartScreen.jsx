import { stages } from "../stages";
import PropTypes from "prop-types";

const StartScreen = ({ setGameStage }) => {
  const startGame = () => {
    setGameStage(stages[1].name);
  };

  return (
    <div className="my-36 flex flex-col items-center">
      <h1 className="mb-2 text-6xl font-bold text-white">Palavra Certa</h1>
      <p className="mb-8 italic text-blue-100">
        Clique no botão abaixo para começar a jogar
      </p>
      <button className="button" onClick={startGame}>
        Começar o jogo
      </button>
    </div>
  );
};

StartScreen.propTypes = {
  setGameStage: PropTypes.func.isRequired,
};

export default StartScreen;
