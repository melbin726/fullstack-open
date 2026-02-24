import { useState, useEffect } from "react";
import axios from "axios";
import CountryDetail from "./components/CountryDetail";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Fetch all countries on load
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleSearch = (event) => {
    const search = event.target.value;
    setValue(search);
    setSelectedCountry(null); // Reset selected country when searching

    const results = countries.filter((c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredCountries(results);
  };

  return (
    <div>
      <div>
        find countries <input value={value} onChange={handleSearch} />
      </div>

      <div style={{ marginTop: "20px" }}>
        {/* Priority 1: Show selected country from button click */}
        {selectedCountry ? (
          <CountryDetail country={selectedCountry} />
        ) : (
          /* Priority 2: Logic for search results */
          <>
            {filteredCountries.length > 10 && (
              <div>Too many matches, specify another filter</div>
            )}

            {filteredCountries.length <= 10 &&
              filteredCountries.length > 1 &&
              filteredCountries.map((c) => (
                <div key={c.cca3}>
                  {c.name.common}{" "}
                  <button onClick={() => setSelectedCountry(c)}>show</button>
                </div>
              ))}

            {filteredCountries.length === 1 && (
              <CountryDetail country={filteredCountries[0]} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
