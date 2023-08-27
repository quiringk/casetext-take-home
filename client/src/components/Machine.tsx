import React, { useState } from "react";
import "./Machine.css";
import stickerGrafImg from "./../assets/sticker_graf.png";
import systemsImg from "./../assets/systems.png";
import Button from "./Button";
import Option from "./Option";
import DynamicInput from "./DynamicInput";

function Machine() {
  const [atmState, setAtmState] = useState({
    authenticated: false,
    screen: "welcome",
    message: "Welcome to the ATM",
    balance: 0,
    pin: "",
    optionsLeft: ["", "", "", ""],
    optionsRight: ["", "", "", "Enter PIN"],
    inputLabel: "",
    inputValue: "",
  });

  const {
    inputLabel,
    inputValue,
    message,
    authenticated,
    screen,
    balance,
    pin,
    optionsLeft,
    optionsRight,
  } = atmState;

  const buttonPressed = async (value: string) => {
    switch (value) {
      case "Balance":
        setAtmState((prevState) => ({
          ...prevState,
          screen: "balance",
          inputLabel: "Balance:",
          inputValue: balance.toString(),
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
          screen: "pin",
          message: "",
          inputLabel: "PIN:",
          inputValue: "",
          isPin: true,
          optionsLeft: ["", "", "", ""],
          optionsRight: ["", "", "Cancel", "Enter"],
        }));
        break;
      case "Enter":
        switch (screen) {
          case "pin":
            if (inputValue.length === 4) {
              try {
                const response = await fetch(
                  "http://localhost:3001/validate-pin",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ pin: inputValue }),
                  }
                );

                console.log("response", response);

                if (response.ok) {
                  const account = await response.json();
                  // Here, you can also update the greeting message to display the account name.
                  setAtmState((prevState) => ({
                    ...prevState,
                    authenticated: true,
                    message: `Hi ${account.name}! Please make a choice...`,
                    balance: account.balance,
                    pin: inputValue,
                    optionsLeft: ["", "", "Withdraw", "Deposit"],
                    optionsRight: ["", "Exit", "Balance", "Re-Enter PIN"],
                    inputLabel: "",
                  }));
                } else {
                  // Handle incorrect PIN or any other error
                  setAtmState((prevState) => ({
                    ...prevState,
                    inputLabel: "",
                    message: "Invalid PIN",
                    optionsLeft: ["", "", "", ""],
                    optionsRight: ["", "", "", "Cancel"],
                  }));
                }
              } catch (error) {
                // Handle network or any other errors here
                console.error("Error while validating PIN:", error);
                setAtmState((prevState) => ({
                  ...prevState,
                  inputLabel: "",
                  message: "Error validating PIN. Please try again.",
                  optionsLeft: ["", "", "", ""],
                  optionsRight: ["", "", "", "Cancel"],
                }));
              }
            } else {
              setAtmState((prevState) => ({
                ...prevState,
                inputLabel: "",
                message: "Invalid PIN length",
                optionsLeft: ["", "", "", ""],
                optionsRight: ["", "", "", "Cancel"],
              }));
            }
            break;
          case "withdraw": {
            if (parseInt(inputValue) <= balance && parseInt(inputValue) > 0) {
              // Make the API request
              fetch("http://localhost:3001/withdraw", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  pin: pin, // this should be the pin of the authenticated user
                  amount: parseInt(inputValue),
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  setAtmState((prevState) => ({
                    ...prevState,
                    inputLabel: "",
                    balance: data.newBalance,
                    message: "Money has successfully been withdrawn!",
                    optionsRight: ["", "", "Exit", "Back to Menu"],
                  }));
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
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
              fetch("http://localhost:3001/deposit", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  pin: pin,
                  amount: parseInt(inputValue),
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.success) {
                    setAtmState((prevState) => ({
                      ...prevState,
                      balance: data.newBalance,
                      inputLabel: "",
                      inputValue: "",
                      message: "Money has successfully been deposited!",
                      optionsRight: ["", "", "Exit", "Back to Menu"],
                    }));
                  } else {
                    // Handle any error message from the server here
                    setAtmState((prevState) => ({
                      ...prevState,
                      inputLabel: "",
                      inputValue: "",
                      message: "Failed to deposit.",
                      optionsRight: ["", "", "", "Cancel"],
                    }));
                  }
                })
                .catch((error) => {
                  console.error("Error while depositing:", error);
                  setAtmState((prevState) => ({
                    ...prevState,
                    inputLabel: "",
                    inputValue: "",
                    message: "Error occurred. Please try again.",
                    optionsRight: ["", "", "", "Cancel"],
                  }));
                });
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
          screen: "withdraw",
          message: "",
          inputLabel: "Withdraw:",
          inputValue: "",
          optionsLeft: ["", "", "", ""],
          optionsRight: ["", "", "Cancel", "Enter"],
          isPin: false,
        }));
        break;
      case "Deposit":
        setAtmState((prevState) => ({
          ...prevState,
          screen: "deposit",
          message: "",
          inputLabel: "Deposit:",
          inputValue: "",
          optionsLeft: ["", "", "", ""],
          optionsRight: ["", "", "Cancel", "Enter"],
          isPin: false,
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
            isPin={screen === "pin"}
            maxLength={screen === "pin" ? 4 : 8}
            readOnly={screen === "balance"}
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
