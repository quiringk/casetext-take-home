import React from "react";
import "./App.css";
import atmSignImg from "./assets/atm_sign.png";
import graffitiImg from "./assets/graffiti.png";
import Machine from "./components/Machine";

function App() {
  const [selectedCard, setSelectedCard] = React.useState("pulse");
  return (
    <div className="background">
      <div className="atm-container">
        <div className="atm-sign-container">
          <img src={atmSignImg} alt="" />
          <img src={graffitiImg} className="graffiti-img" alt="" />
        </div>
        <div className="atm">
          <div className="gray-bar" />
          <div className="credit-cards-container">
            <div className="credit-card-back"></div>
            <div
              className={`credit-card-front credit-card-${selectedCard}`}
            ></div>
          </div>
          <Machine />
        </div>
      </div>
    </div>
  );
}

export default App;
