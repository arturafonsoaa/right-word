import { stages } from "../stages";
import { wordsDataBase } from "../data/words";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const Game = ({ setGameStage, score, setScore }) => {
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [typedLetter, setTypedLetter] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [attempts, setAttempts] = useState(5);

  const typedLetterInputRef = useRef(null);

  const isInitialized = useRef(false);

  const pickCategory = () => {
    const categories = Object.keys(wordsDataBase);

    return categories[Math.floor(Math.random() * categories.length)];
  };

  const pickWord = (category) => {
    const words = wordsDataBase[category];

    return words[Math.floor(Math.random() * words.length)];
  };

  const getWordLetters = (word) => {
    const wordLetters = word.split("");

    return wordLetters.map((letter) => letter.toUpperCase());
  };

  const initialize = () => {
    if (isInitialized.current) {
      return;
    }

    isInitialized.current = true;

    setGuessedLetters([]);
    setWrongLetters([]);
    setAttempts(5);

    const category = pickCategory();
    setPickedCategory(category);

    const word = pickWord(category);

    const wordLetters = getWordLetters(word);
    setLetters(wordLetters);

    typedLetterInputRef.current.focus();
  };

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toUpperCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((currentGuessedLetters) => [
        ...currentGuessedLetters,
        normalizedLetter,
      ]);

      return;
    }

    setWrongLetters((currentWrongLetters) => [
      ...currentWrongLetters,
      normalizedLetter,
    ]);

    setAttempts((currentAttempts) => currentAttempts - 1);

    // setGameStage(stages[2].name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(typedLetter);

    setTypedLetter("");
    typedLetterInputRef.current.focus();
  };

  useEffect(() => initialize());

  useEffect(() => {
    if (attempts <= 0) {
      setGameStage(stages[2].name);
    }
  }, [attempts]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (
      uniqueLetters.length > 0 &&
      guessedLetters.length === uniqueLetters.length
    ) {
      setScore((currentScore) => currentScore + 1);
      isInitialized.current = false;
      initialize();
    }
  }, [guessedLetters]);

  return (
    <div className="flex flex-col items-center py-20">
      <p className="mb-2 text-lg uppercase text-white">
        Pontuação: <span className="text-amber-200">{score}</span>
      </p>

      <h1 className="mb-0 text-xl font-bold text-white">Adivinha a palavra:</h1>

      <h3 className="mb-8 text-lg font-bold text-white">
        Dica sobre a palavra:{" "}
        <span className="text-amber-200">{pickedCategory}</span>
      </h3>

      <p className="text-white">
        Você ainda tem <span className="text-amber-200">{attempts}</span>{" "}
        tentativa(s).
      </p>

      <div className="m-6 flex rounded-lg border-8 p-6">
        {letters.map((letter, index) => (
          <span
            key={index}
            className="flex size-24 items-center justify-center border-y-4 border-l-4 border-black bg-white text-7xl font-bold uppercase leading-6 text-black last:border-r-4"
          >
            {guessedLetters.includes(letter) ? letter : ""}
          </span>
        ))}
      </div>

      <div>
        <p className="mb-4 text-white">Tente adivinhar uma letra da palavra:</p>
        <form
          className="mb-4 flex items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="letter"
            maxLength="1"
            className="size-12 rounded-l-full pl-2 text-center text-2xl uppercase focus:outline-none"
            required
            value={typedLetter}
            onChange={(e) => setTypedLetter(e.target.value)}
            ref={typedLetterInputRef}
          />
          <button className="button input-button">Verificar</button>
        </form>
      </div>

      <div className="flex gap-2 text-white">
        <p>Letras já utilizadas:</p>
        <div>
          {wrongLetters.map((letter, index) => (
            <span key={index}>
              {`${letter}${index < wrongLetters.length - 1 ? ", " : ""}`}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

Game.propTypes = {
  setGameStage: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
};

export default Game;
