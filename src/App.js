import { useEffect, useState } from "react";
import "./App.css";
import Brewery from "./Brewery";

function App() {
  const [breweries, setBreweries] = useState([]);
  const [filteredBreweries, setFilteredBreweries] = useState([]);
  const [city, setCity] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    getBreweries();
  }, []);

  const getBreweries = async () => {
    const res = await fetch("https://api.openbrewerydb.org/breweries");
    const json = await res.json();
    console.log(json);
    setBreweries(json);
    setFilteredBreweries(json);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://api.openbrewerydb.org/breweries?${type && `by_type=${type}`}&${
        city && `by_city=${city}`
      }`
    );
    const json = await res.json();
    setFilteredBreweries(json);
  };

  return (
    <div className="app">
      <h1>Brewery List</h1>
      <div className="search-params">
        <form>
          <label htmlFor="City">
            City
            <select onChange={(e) => setCity(e.target.value)}>
              <option value="">All</option>
              {breweries.map((brewery) => (
                <option key={brewery.id}>{brewery.city}</option>
              ))}
            </select>
          </label>

          <label htmlFor="Type">
            Type
            <select onChange={(e) => setType(e.target.value)}>
              <option value="">All</option>
              {[...new Set(breweries.map((item) => item.brewery_type))].map(
                (brewery) => (
                  <option key={brewery}>{brewery}</option>
                )
              )}
            </select>
          </label>
          <button onClick={handleSubmit}>Submit</button>
        </form>

        <div className="result">
          {filteredBreweries.map((filteredBrewery) => (
            <Brewery
              name={filteredBrewery.name}
              brewery_type={filteredBrewery.brewery_type}
              street={filteredBrewery.street}
              phone={filteredBrewery.phone}
              website_url={filteredBrewery.website_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
