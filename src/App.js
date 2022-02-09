import Ball from './components/Ball';
import Players from './components/Players';
import { useState } from "react";


function App() {
  const startingBalls = [
    {
      number: 1,
      color: 'yellow',
      striped: false,
    },
    {
      number: 2,
      color: 'blue',
      striped: false,
    },
    {
      number: 3,
      color: 'red',
      striped: false,
    },
    {
      number: 4,
      color: 'purple',
      striped: false,
    },
    {
      number: 5,
      color: 'orange',
      striped: false,
    },
    {
      number: 6,
      color: 'green',
      striped: false,
    },
    {
      number: 7,
      color: 'darkred',
      striped: false,
    },
    {
      number: 8,
      color: 'black',
      striped: false,
    },
    {
      number: 9,
      color: 'yellow',
      striped: true,
    },
    {
      number: 10,
      color: 'blue',
      striped: true,
    },
    {
      number: 11,
      color: 'red',
      striped: true,
    },
    {
      number: 12,
      color: 'purple',
      striped: true,
    },
    {
      number: 13,
      color: 'orange',
      striped: true,
    },
    {
      number: 14,
      color: 'green',
      striped: true,
    },
    {
      number: 15,
      color: 'darkred',
      striped: true,
    }
  ]

  const [players, setPlayers] = useState([]);
  const [balls, setBalls] = useState(startingBalls);
  const [action, setAction] = useState("Start game");
  const [info, setInfo] = useState("");
  const [activePlayer, setActivePlayer] = useState(0);
  const [gameState, setGameState] = useState("not started");

  const ballClicked = (ball) => {
    if (gameState === "choose colors") {
      players[activePlayer].color = ball.color;

      if (activePlayer >= players.length - 1) {
        setGameState("game started");
        setActivePlayer(0);
        setInfo("Game started! Please play " + players[0].name);
      }
      else {
        setAction("Next player");
        const player = players[activePlayer + 1];
        setActivePlayer(activePlayer + 1);

        setInfo(player.name + ", choose color")
      }
    }
    if (gameState === "game started") {
      console.log(players)

      setBalls(balls.filter(b => b.number !== ball.number));

      players.forEach(player => {
        console.log(activePlayer)
        if (player.color === ball.color) {
          var count = 0;

          balls.forEach(b => {
            if (b.color === ball.color)
              count++;
          })

          if (players.length === 2 && count === 1) {
            setInfo(players[activePlayer].name + " has won the game!")
            setAction("Restart");
            setGameState("game over");
            players.pop(player);
          } else if (count === 1) {
            setInfo(player.name + " has been eliminated by " + players[activePlayer].name)
            players.pop(player);
          }
        }
      })
    }
  }

  const actionButton = () => {
    switch (gameState) {
      case "not started":
        if (players.length > 0) {
          setGameState("choose colors");
          setAction("Next player");
          const player = players[activePlayer];
          setInfo(player.name + ", choose color")
        } else {
          setInfo("Please add players");
        }
        break;

      case "game started":
        if (activePlayer >= players.length - 1) {
          console.log(players);
          setInfo(players[0].name + " play");
          setActivePlayer(0);
        }
        else {
          setInfo(players[activePlayer + 1].name + " play");
          setActivePlayer(activePlayer + 1);
        }
        break;
      case "game over":
        window.location.reload(false);
        break;
      default:
        setInfo("Error, something went wrong");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Balls</h1>
      </header>
      <main>
        <div className="balls-holder">
          {
            balls.map(ball => {
              return (<Ball clicked={ballClicked} key={ball.number} number={ball.number} color={ball.color} striped={ball.striped} />)
            })
          }
        </div>

        <Players players={players} setPlayers={setPlayers} />

        <div className="controls">
          <button className="action" onClick={actionButton}>
            {action}
          </button>
          <h1>{info}</h1>
        </div>
      </main>
    </div>
  )
}

export default App;
