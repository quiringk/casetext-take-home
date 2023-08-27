import "./App.css";
import atmSignImg from "./assets/atm_sign.png";
import graffitiImg from "./assets/graffiti.png";
import Machine from "./components/Machine";
import CreditCards from "./components/CreditCards";

function App() {
  return (
    <div className="background">
      <div className="atm-container">
        <div className="atm-sign">
          <img src={atmSignImg} alt="" />
          <img src={graffitiImg} className="graffiti-img" alt="" />
        </div>
        <div className="atm-body">
          <div className="gray-bar" />
          <CreditCards />
          <Machine />
        </div>
      </div>
    </div>
  );
}

export default App;
