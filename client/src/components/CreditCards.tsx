import React from "react";
import "./CreditCards.css";

function CreditCards() {
  const [selectedCard, setSelectedCard] = React.useState("star");
  return (
    <div className="credit-cards-container">
      <div className="credit-card-back"></div>
      <div className={`credit-card-front credit-card-${selectedCard}`}></div>
    </div>
  );
}

export default CreditCards;
