import React from 'react'
import "./Game.css"

const Game = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score}) => {


  const [letter, setLetter] = React.useState("");
  const inputRef = React.useRef(null);

  const handleSubmit = (e) =>{

    e.preventDefault();
    verifyLetter(letter);
    inputRef.current.focus();
    setLetter("");
  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
        <h1>Advinhe a palavra</h1>
        <h3 className="tip">
          Dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativa{guesses > 1 ? "s" : ""}.</p>
        <div className="wordContainer">
          {letters && letters.map((l, index) => (

              guessedLetters.includes(l) ? <span key={index} className="letter">{l}</span> : <span key={index} className="blankSquare"></span>
          ))}
        </div>
        <div className="letterContainer">
          <p>Tente advinhar uma letra da palavra:</p>
          <form onSubmit={handleSubmit}>
              <input ref={inputRef} value={letter} onChange={((e) => setLetter(e.target.value))}type="text" name="letter" maxLength="1" required/>
              <button>Jogar!</button>
          </form>
        </div>
        <div className="wrongLettersContainer">
          <p>Letras erradas: </p>
          {wrongLetters.map((w, index) =>(

            <span key={index}>{w}, </span>
          ))}
        </div>
    </div>
  )
}

export default Game