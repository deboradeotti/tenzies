import React from "react";
import Die from "./Die";
import { nanoid } from 'nanoid';

export default function App() {

  const [dice, setDice] = React.useState(allNewDice());

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      const num = Math.floor(Math.random() * 6) + 1;
      const die = {
        value: num,
        isHeld: true,
        id: nanoid()
      }
      newDice.push(die);
    }
    return newDice;
  }

  const dieElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} />
  ))

  function rollDice() {
    setDice(allNewDice());
  }

  return(
    <main className="board">
      <h1 className="board__title">Tenzies</h1>
      <p className="board__description">Roll until all dice are the same. Click<br></br>each dice to freeze it at its current value<br></br>between rolls.</p>
      <div className="dice-container">
        {dieElements}
      </div>
      <button className="button" onClick={rollDice}>Roll</button>
    </main>
  )
}