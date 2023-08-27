# ATM App

This application consists of two main components: the API server and the client. In this guide, we'll cover how to install, start, and use both components of the app.

## Directory Structure

- `api/`: Contains the API server code.
- `client/`: Contains the client code.

## API

### Overview

The API server manages all ATM operations. Account information, including pins and balances, is stored in the `accounts.ts` file located in the `api/src` directory. For simplicity and demonstration purposes, this file acts as our "database". In real-world applications, you would typically use an actual database for managing accounts.

### Installation & Starting

1. Navigate to the `api` directory from the root of the project:

```bash
cd api
```

2. Install the necessary dependencies:

```bash
npm install
```

3. Start the API server:

```bash
npm start
```

The server will now be running on http://localhost:3001.

## Client

### Installation & Starting

1. Navigate to the `client` directory from the root of the project:

```bash
cd client
```

2. Install the necessary dependencies:

```bash
npm install
```

3. Start the client:

```bash
npm start
```

The client interface will now open in your default browser, running on http://localhost:3000.

## Usage

1. Validation: Use the client interface to enter a pin and validate it. The API will check the accounts.ts file for a match (check this file for matching pins). Depending on which account is matched, the credit card for that account should light up on the ATM and a welcome message should be displayed for the name associated with the account.

2. Withdraw: Enter a pin and the amount you wish to withdraw. The API will deduct the amount from the matched account in the accounts.ts file, provided sufficient funds are available.

3. Deposit: Enter a pin and the amount you wish to deposit. The API will add the amount to the matched account in the accounts.ts file.

## Note

As this application uses a .ts file to store account information, any changes made will be reflected directly in the accounts.ts file.
