import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const headline1 = "Give feedback"
  const headline2 = "Statistics"

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(allClicks.concat(1));
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAll(allClicks.concat(0));
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setAll(allClicks.concat(-1));
  };


  return (
    <div>
      <h1>{headline1}</h1>
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <h1>{headline2}</h1>
      
      <Statistics values={allClicks} good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  console.log(props.values)
  if (props.values.length === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  const sum = props.values.reduce((a, b) => a + b, 0)
  const average = sum / props.values.length

  const positiveClicks = props.values.filter((click) => click > 0)

  const all = props.values.length

  const positivePercentage = (positiveClicks.length / all) * 100 + "%"
  return(
    <div>
      <StatisticLine value={props.good} text={"Good "} />
      <StatisticLine value={props.neutral} text={"Neutral "} />
      <StatisticLine value={props.bad} text={"Bad "}  />
      <StatisticLine value={average} text={"Average "} />
      <StatisticLine value={positivePercentage} text={"Positive "} />

    </div>
  )
  
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);


export default App