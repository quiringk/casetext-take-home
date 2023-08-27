import React, { useState } from "react";
import "./Machine.css";
import stickerGrafImg from "./../assets/sticker_graf.png";
import systemsImg from "./../assets/systems.png";
import Button from "./Button";
import Option from "./Option";
import DynamicInput from "./DynamicInput";

function Machine() {
  const [atmState, setAtmState] = useState({
    screen: "welcome",
    inputLabel: "",
    inputValue: "",
    isPin: false,
    readOnly: false,
    message: "Welcome to the ATM",
    authenticated: false,
    action: "",
    balance: 50000,
    optionsLeft: ["", "", "", ""],
    optionsRight: ["", "", "", "Enter PIN"],
  });

  const {
    inputLabel,
    inputValue,
    isPin,
    readOnly,
    message,
    authenticated,
    action,
    balance,
    optionsLeft,
    optionsRight,
  } = atmState;

  const buttonPressed = (option: string) => {
    switch (option) {
      case "Balance":
        setAtmState((prevState) => ({
          ...prevState,
          inputLabel: "Balance:",
          inputValue: balance.toString(),
          readOnly: true,
          message: "",
          optionsLeft: ["", "", "", ""],
          optionsRight: ["", "", "", "Cancel"],
          isPin: false,
        }));
        break;
      case "Enter PIN":
      case "Re-Enter PIN":
        setAtmState((prevState) => ({
          ...prevState,
          authenticated: false,
          action: "pin",
          message: "",
          inputLabel: "PIN:",
          inputValue: "",
          isPin: true,
          readOnly: false,
          optionsLeft: ["", "", "", ""],
          optionsRight: ["", "", "Cancel", "Enter"],
        }));
        break;
      case "Enter":
        switch (action) {
          case "pin":
            if (inputValue.length === 4) {
              setAtmState((prevState) => ({
                ...prevState,
                inputLabel: "",
                authenticated: true,
                message: "Hi Peter Parker! Please make a choice...",
                optionsLeft: ["", "", "Withdraw", "Deposit"],
                optionsRight: ["", "Exit", "Balance", "Re-Enter PIN"],
              }));
            } else {
              setAtmState((prevState) => ({
                ...prevState,
                inputLabel: "",
                message: "Invalid PIN",
                optionsLeft: ["", "", "", ""],
                optionsRight: ["", "", "", "Cancel"],
              }));
            }
            break;
          case "withdraw": {
            if (parseInt(inputValue) <= balance && parseInt(inputValue) > 0) {
              setAtmState((prevState) => ({
                ...prevState,
                inputLabel: "",
                balance: balance - parseInt(inputValue),
                message: "Money has successfully been withdrawn!",
                optionsRight: ["", "", "Exit", "Back to Menu"],
              }));
            } else if (parseInt(inputValue) > balance) {
              setAtmState((prevState) => ({
                ...prevState,
                inputLabel: "",
                message: "Insufficient funds",
                optionsLeft: ["", "", "", ""],
                optionsRight: ["", "", "", "Cancel"],
              }));
            } else {
              setAtmState((prevState) => ({
                ...prevState,
                inputLabel: "",
                inputValue: "",
                message: "No amount entered.",
                optionsRight: ["", "", "", "Cancel"],
              }));
            }
            break;
          }
          case "deposit":
            if (parseInt(inputValue) > 0) {
              setAtmState((prevState) => ({
                ...prevState,
                balance: balance + parseInt(inputValue),
                inputLabel: "",
                inputValue: "",
                message: "Money has successfully been deposited!",
                optionsRight: ["", "", "Exit", "Back to Menu"],
              }));
            } else {
              setAtmState((prevState) => ({
                ...prevState,
                inputLabel: "",
                inputValue: "",
                message: "No amount entered.",
                optionsRight: ["", "", "", "Cancel"],
              }));
            }
        }
        break;
      case "Exit":
        setAtmState((prevState) => ({
          ...prevState,
          message: "Welcome to the ATM",
          optionsLeft: ["", "", "", ""],
          optionsRight: ["", "", "", "Enter PIN"],
          authenticated: false,
        }));
        break;
      case "Back to Menu":
      case "Cancel":
        if (authenticated) {
          setAtmState((prevState) => ({
            ...prevState,
            inputLabel: "",
            message: "Hi Peter Parker! Please make a choice...",
            optionsLeft: ["", "", "Withdraw", "Deposit"],
            optionsRight: ["", "Exit", "Balance", "Re-Enter PIN"],
          }));
        } else {
          setAtmState((prevState) => ({
            ...prevState,
            inputLabel: "",
            message: "Welcome to the ATM",
            optionsRight: ["", "", "", "Enter PIN"],
          }));
        }
        break;
      case "Withdraw":
        setAtmState((prevState) => ({
          ...prevState,
          action: "withdraw",
          message: "",
          inputLabel: "Withdraw:",
          inputValue: "",
          optionsLeft: ["", "", "", ""],
          optionsRight: ["", "", "Cancel", "Enter"],
          isPin: false,
          readOnly: false,
        }));
        break;
      case "Deposit":
        setAtmState((prevState) => ({
          ...prevState,
          action: "deposit",
          message: "",
          inputLabel: "Deposit:",
          inputValue: "",
          optionsLeft: ["", "", "", ""],
          optionsRight: ["", "", "Cancel", "Enter"],
          isPin: false,
          readOnly: false,
        }));
        break;
      default:
        break;
    }
  };

  return (
    <div className="screen-section">
      <div className="buttons">
        <Button side={"left"} onClick={() => buttonPressed(optionsLeft[0])} />
        <Button side={"left"} onClick={() => buttonPressed(optionsLeft[1])} />
        <Button side={"left"} onClick={() => buttonPressed(optionsLeft[2])} />
        <Button side={"left"} onClick={() => buttonPressed(optionsLeft[3])} />
      </div>
      <div className="screen">
        {message && (
          <div
            className={`message ${
              authenticated ? "font-size-11" : "font-size-15"
            }`}
          >
            {message}
          </div>
        )}
        {inputLabel && (
          <DynamicInput
            label={inputLabel}
            value={inputValue}
            onChange={(val) =>
              setAtmState((prevState) => ({ ...prevState, inputValue: val }))
            }
            isPin={isPin}
            maxLength={isPin ? 4 : 8}
            readOnly={readOnly}
          />
        )}
        <Option side="left" position={1} value={optionsLeft[0]} />
        <Option side="left" position={2} value={optionsLeft[1]} />
        <Option side="left" position={3} value={optionsLeft[2]} />
        <Option side="left" position={4} value={optionsLeft[3]} />
        <Option side="right" position={1} value={optionsRight[0]} />
        <Option side="right" position={2} value={optionsRight[1]} />
        <Option side="right" position={3} value={optionsRight[2]} />
        <Option side="right" position={4} value={optionsRight[3]} />
        <img src={stickerGrafImg} className="sticker-graf-img" alt="" />
        <img src={systemsImg} className="systems-img" alt="" />
      </div>
      <div className="buttons">
        <Button side={"right"} onClick={() => buttonPressed(optionsRight[0])} />
        <Button side={"right"} onClick={() => buttonPressed(optionsRight[1])} />
        <Button side={"right"} onClick={() => buttonPressed(optionsRight[2])} />
        <Button side={"right"} onClick={() => buttonPressed(optionsRight[3])} />
      </div>
    </div>
  );
}

export default Machine;
