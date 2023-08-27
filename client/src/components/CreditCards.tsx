import "./CreditCards.css";

interface Props {
  selectedCard: string;
}

function CreditCards({ selectedCard }: Props) {
  return (
    <div className="credit-cards-container">
      <div className="credit-card-back"></div>
      {selectedCard && (
        <div className={`credit-card-front credit-card-${selectedCard}`}></div>
      )}
    </div>
  );
}

export default CreditCards;
