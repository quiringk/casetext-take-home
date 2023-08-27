import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { accounts } from "./accounts";
import { Account } from "./types";

const app = express();
app.use(cors());
const PORT = 3001;

app.use(express.json());

app.post("/validate-pin", (req, res) => {
  const pinToValidate = req.body.pin;

  if (!pinToValidate || typeof pinToValidate !== "string") {
    return res
      .status(400)
      .send("Pin is required and must be a string of 4 characters.");
  }

  const matchingAccount = accounts.find(
    (account: Account) => account.pin === pinToValidate
  );

  if (matchingAccount) {
    res.json(matchingAccount);
  } else {
    res.status(404).send("No account found for provided pin.");
  }
});

app.post("/withdraw", (req, res) => {
  const { pin, amount } = req.body;

  const accountIndex = accounts.findIndex(
    (account: Account) => account.pin === pin
  );

  if (accountIndex === -1) {
    return res.status(404).send("Account not found.");
  }

  if (accounts[accountIndex].balance < amount) {
    return res.status(400).send("Insufficient funds.");
  }

  // Subtract the amount
  accounts[accountIndex].balance -= amount;

  // Write back to accounts.ts
  const content = `export const accounts = ${JSON.stringify(
    accounts,
    null,
    2
  )};`;

  fs.writeFileSync(path.join(__dirname, "accounts.ts"), content, "utf8");

  return res.json({ newBalance: accounts[accountIndex].balance });
});

app.post("/deposit", (req, res) => {
  const { pin, amount } = req.body;

  if (
    !pin ||
    typeof pin !== "string" ||
    !amount ||
    typeof amount !== "number"
  ) {
    return res.status(400).send("Pin and Amount are required.");
  }

  const matchingAccount = accounts.find((account) => account.pin === pin);

  if (!matchingAccount) {
    return res.status(404).send("No account found for provided pin.");
  }

  matchingAccount.balance += amount;

  fs.writeFileSync(
    path.join(__dirname, "accounts.ts"),
    `export const accounts = ${JSON.stringify(accounts, null, 2)};`,
    "utf8"
  );

  res.json({ success: true, newBalance: matchingAccount.balance });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
