import React from "react";
import "./App.css";
import atmSignImg from "./assets/atm_sign.png";
import graffitiImg from "./assets/graffiti.png";
import stickerGrafImg from "./assets/sticker_graf.png";
import systemsImg from "./assets/systems.png";
import Button from "./components/button/Button";

function App() {
  const [selectedCard, setSelectedCard] = React.useState("star");

  return (
    <div className="background">
      <div className="atm-container">
        <div className="atm-sign-container">
          <img src={atmSignImg} />
          <img src={graffitiImg} className="graffiti-img" />
        </div>
        <div className="atm">
          <div className="gray-bar" />
          <div className="credit-cards-container">
            <div className="credit-card-back"></div>
            <div
              className={`credit-card-front credit-card-${selectedCard}`}
            ></div>
          </div>
          <div className="screen-section">
            <div className="buttons">
              <Button side={"left"} />
              <Button side={"left"} />
              <Button side={"left"} />
              <Button side={"left"} />
            </div>
            <div className="screen">
              <img src={stickerGrafImg} className="sticker-graf-img" />
              <img src={systemsImg} className="systems-img" />
            </div>
            <div className="buttons">
              <Button side={"right"} />
              <Button side={"right"} />
              <Button side={"right"} />
              <Button side={"right"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
