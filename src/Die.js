export default function Die(props) {
  return(
    <div className={`die ${props.isHeld ? "held" : ""}`} onClick={props.holdDice}>
      <h2 className="die__number">{props.value}</h2>
    </div>
  )
}