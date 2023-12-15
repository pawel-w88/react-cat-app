import { useState, useEffect } from "react";
import catFactsImage from "./cat-facts.png";
import catLoadingImage from "./cat-loading.gif";
import "./index.css";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const newFacts = async () => {
    setLoading(false);
    try {
      const response = await fetch("https://catfact.ninja/fact");
      const newData = await response.json();
      setData(newData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await (await fetch("https://catfact.ninja/fact")).json();
        setTimeout(() => {
          setLoading(false);
          setData(data);
        }, 3000);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      {!loading ? (
        <>
          <img src={catFactsImage} alt="catFacts"></img>
          <ul>
            <li>{data.fact ? <li>{data.fact}</li> : <li>Loading...</li>}</li>
          </ul>
          <button onClick={newFacts}>Get new Fact</button>
        </>
      ) : (
        <div className="loader">
          <img src={catLoadingImage} alt="catLoadingImage" />
        </div>
      )}
    </div>
  );
}

export default App;
