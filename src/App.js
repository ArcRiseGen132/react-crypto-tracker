import "./App.css"
import axios from "axios"
import { useState, useEffect } from "react"
import Coin from "./Coin"

const LandingAPILink =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"

function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState("")

  const SearchAPILink =
    "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=true&community_data=false&developer_data=false"

  useEffect(() => {
    axios
      .get(LandingAPILink)
      .then((res) => {
        setCoins(res.data)
      })
      .catch((err) => console.log("Error fetching data"))
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a crypto</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          ></input>
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketCap={coin.market_cap}
          />
        )
      })}
    </div>
  )
}

export default App
