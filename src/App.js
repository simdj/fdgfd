import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { useState, useEffect } from "react";
import Home from "./routes/Home"
import Detail from "./routes/Detail"

function ToDoList() {
  const [todo, set_todo] = useState("");
  const onChange = (event) => set_todo(event.target.value);

  const [todo_list, set_todo_list] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (todo === "") {
      return;
    }

    set_todo_list((cur_todo_list) => {
      return [...cur_todo_list, todo];
    });

    set_todo("");
  };
  console.log(todo_list);

  return (
    <div>
      <h1>My todos ({todo_list.length})</h1>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={todo} type="text" />
        <button>Add to do</button>
      </form>
      <hr />
      <ul>
        {todo_list.map((todo, index) => (
          <li key={"todo" + index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

function CoinTracker() {
  const [loading, set_loading] = useState(true);
  const [coins, set_coins] = useState([]);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res) => res.json())
      .then((json) => {
        set_coins(json);
        set_loading(false);
        set_coin_index(0);
      });
  }, []);

  const [amount, set_amount] = useState(0);
  const [coin_index, set_coin_index] = useState(-1);
  return (
    <div>
      <h1> The Coins ({coins.length})</h1>
      {loading ? (
        <strong>loading...</strong>
      ) : (
        <div>
          <select
            onChange={(event) => {
              console.log(event.target.value);
              set_coin_index(event.target.value);
            }}
          >
            {coins.map((coin, index) => (
              <option key={index} value={index}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <hr />
          <input
            type="number"
            placeholder=""
            value={amount}
            onChange={(event) => set_amount(event.target.value)}
          />
          <h2>your USD: {amount * coins[coin_index].quotes.USD.price}</h2>
        </div>
      )}
    </div>
  );
}





function App() {
  return (
    <Router>
      <Switch>
        <Route path="/movie/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

    </Router>
  )
}
export default App;
