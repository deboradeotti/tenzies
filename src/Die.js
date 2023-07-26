export default function Die(props) {
  return(
    <div className={`die ${props.isHeld && "held"}`}>
      <h2 className="die__number">{props.value}</h2>
    </div>
  )
}