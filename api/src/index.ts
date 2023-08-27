import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { accounts } from "./accounts";
import { Account } from "./types";

const app = express();
app.use(cors());
const PORT = 3001;

app.use(express.json());

interface ValidatePinRequestBody {
  pin: string;
}

app.post(
  "/validate-pin",
  (req: Request<{}, {}, ValidatePinRequestBody>, res: Response) => {
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
  }
);

interface WithdrawRequestBody {
  pin: string;
  amount: number;
}

app.post(
  "/withdraw",
  (req: Request<{}, {}, WithdrawRequestBody>, res: Response) => {
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

    accounts[accountIndex].balance -= amount;

    const content = `export const accounts = ${JSON.stringify(
      accounts,
      null,
      2
    )};`;

    fs.writeFileSync(path.join(__dirname, "accounts.ts"), content, "utf8");

    return res.json({ newBalance: accounts[accountIndex].balance });
  }
);

interface DepositRequestBody {
  pin: string;
  amount: number;
}

app.post(
  "/deposit",
  (req: Request<{}, {}, DepositRequestBody>, res: Response) => {
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
  }
);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
