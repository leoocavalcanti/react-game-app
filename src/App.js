import React from 'react'
import "./App.css";
import Game from './components/Game';
import GameOver from './components/GameOver';
import StartScreen from './components/StartScreen';
import {wordsList} from "./data/words";

const stages = [

  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
];

const App = () => {

  const [gameStage, setGameStage] = React.useState(stages[0].name);
  const [words] = React.useState(wordsList);

  const [pickedWord, setPickedWord] = React.useState("");
  const [pickedCategory, setPickedCategory] = React.useState("");
  const [letters, setLetters] = React.useState([]);

  const [guessedLetters, setGuessedLetters] = React.useState([]);
  const [wrongLetters, setWrongLetters] = React.useState([]);

  const [guesses, setGuesses] = React.useState(3);

  const [score, setScore] = React.useState(0);


  const pickWordAndCategory = React.useCallback(() =>{

    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    return {word, category};
  }, [words])
 
  const startGame = React.useCallback(() =>{

    clearLettersStates();
    setGameStage(stages[1].name);
    const {word, category} = pickWordAndCategory();
    let wordLetters = word.toLowerCase().split("");

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters)
   
  }, [pickWordAndCategory])

  const verifyLetter = (letter) =>{

    const normalize = letter.toLowerCase();
    if(guessedLetters.includes(normalize) || wrongLetters.includes(normalize)){

      return;
    }

    if(letters.includes(normalize)){

      setGuessedLetters([...guessedLetters, normalize])
  }

  else{

    setWrongLetters([...wrongLetters, normalize]);
    setGuesses(guesses - 1);
  }
};

  const clearLettersStates = () =>{

    setGuessedLetters([]);
    setWrongLetters([]);
  }

  //CHECANDO CONDIÇÃO DE VITÓRIA
  React.useEffect(() =>{

    const uniqueLetters = [... new Set(letters)];

    if(guessedLetters.length === uniqueLetters.length){

      setScore(score+50);
      startGame();
    }


  }, [guessedLetters, letters, startGame]);

  React.useEffect(() =>{

    if(guesses <= 0){

      //RESETANDO TODOS OS ESTADOS

      clearLettersStates();
      setGameStage(stages[2].name);
    }

  }, [guesses]);


  const retry = () =>{

    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  }

  return (

    <div className="App">

      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && <Game verifyLetter={verifyLetter}
       pickedWord={pickedWord}
       pickedCategory={pickedCategory}
       letters={letters}
       guessedLetters={guessedLetters}
       wrongLetters={wrongLetters}
       guesses={guesses}
       score={score} />}
      {gameStage === "end" && <GameOver score={score} retry={retry}/>}

    </div>
  )
}

export default App