import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import image from './img/linear_reg_img.png';

function App() {
  const [squareFeet, setSquareFeet] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [area, setArea] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [dataSample, setDataSample] = useState([]);
  const [showSampleData, setShowSampleData] = useState(false);

  useEffect(() => {
    const fetchDataSample = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/data_sample/"
        );
        setDataSample(response.data.data_sample);
      } catch (error) {
        console.error("There was an error fetching the data sample!", error);
      }
    };
    fetchDataSample();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = `${squareFeet},${bedrooms},${bathrooms},${area}`;
    try {
      const response = await axios.post(
        "http://localhost:8000/api/predict/",
        `input_data=${inputData}`,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("There was an error making the request!", error);
    }
  };

  const toggleSampleData = () => {
    setShowSampleData(!showSampleData);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Housing Price Predictor</h1>
        <section className="section-content">
          <h2>About Linear Regression</h2>
          <img src={image} alt="Linear Regression" />
          <p>
            Linear regression is an algorithm that provides a linear relationship between an independent variable and a dependent variable to predict the outcome of future events. It is a statistical method used in data science and machine learning for predictive analysis.
          </p>
          <p>
            The independent variable is also the predictor or explanatory variable that remains unchanged due to the change in other variables. However, the dependent variable changes with fluctuations in the independent variable. The regression model predicts the value of the dependent variable, which is the response or outcome variable being analyzed or studied.
          </p>
          <h3>Linear Regression Formula</h3>
          <p>
            The equation of a simple linear regression model is:
          </p>
          <p>
            y = β<sub>0</sub> + β<sub>1</sub>x<sub>1</sub> + β<sub>2</sub>x<sub>2</sub> + ... + β<sub>n</sub>x<sub>n</sub>
          </p>
          <p>
            Here, y is the predicted value, x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>n</sub> are the feature values, β<sub>0</sub> is the intercept, and β<sub>1</sub>, β<sub>2</sub>, ..., β<sub>n</sub> are the coefficients for the features.
          </p>
          <h3>Applications of Linear Regression</h3>
          <p>
            Linear regression is widely used in various fields including finance, economics, and the social sciences. It is often used for:
          </p>
          <ul>
            <li>Predicting stock prices</li>
            <li>Estimating real estate values</li>
            <li>Forecasting sales</li>
            <li>Modeling the relationship between variables in scientific research</li>
          </ul>
        </section>
        <section className="section-content">
          <h2>Data Sample</h2>
          <button onClick={toggleSampleData}>
            {showSampleData ? "Hide Sample Data" : "See Sample Data"}
          </button>
          {showSampleData && (
            <table>
              <thead>
                <tr>
                  <th>Square Feet</th>
                  <th>Bedrooms</th>
                  <th>Bathrooms</th>
                  <th>YearBuilt</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {dataSample.length > 0 ? (
                  dataSample.map((row, index) => (
                    <tr key={index}>
                      <td>{row.SquareFeet}</td>
                      <td>{row.Bedrooms}</td>
                      <td>{row.Bathrooms}</td>
                      <td>{row.YearBuilt}</td>
                      <td>{row.Price}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>
        <section className="section-content">
          <h2>Predict Housing Price</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Square Feet:</label>
              <input
                type="number"
                value={squareFeet}
                onChange={(e) => setSquareFeet(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Bedrooms:</label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Bathrooms:</label>
              <input
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Year Built:</label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              />
            </div>
            <button type="submit">Predict</button>
          </form>
        </section>
        {prediction !== null && (
          <section className="section-content">
            <h2>Prediction Result</h2>
            <p>The predicted housing price is: {prediction}</p>
          </section>
        )}
      </header>
    </div>
  );
}

export default App;
