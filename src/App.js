import React from "react";
import Die from "./Die";
import { nanoid } from 'nanoid';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti';

export default function App() {

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
   const allDiceHeld = dice.every(die => die.isHeld);
   const allSameValue = dice.every(die => die.value === dice[0].value)
   
   if (allDiceHeld && allSameValue) {
    setTenzies(true);
   }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  const dieElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ))

  function rollDice() {
    if(tenzies) {
      setTenzies(false);
      setDice(allNewDice);
    } else {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    }
  }

  function holdDice(id) {
    if(!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return id === die.id ? {...die, isHeld: !die.isHeld} : die
      }))
    }
  }

  const { width, height } = useWindowSize()

  return(
    <main className="board">
      {tenzies && <Confetti width={width} height={height} />}
      <div>
        <h1 className="board__title">Tenzies</h1>
        <p className="board__description">Roll until all dice are the same. Click<br></br>each die to freeze it at its current value<br></br>between rolls.</p>
      </div>
      <div className="dice-container">
        {dieElements}
      </div>
      <button className="button" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}