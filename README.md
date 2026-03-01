# Algorand Web3 Wallet (TestNet)

## 📌 Project Overview

This project is a Web3 frontend wallet built on the Algorand TestNet using Pera Wallet.  
It demonstrates how decentralized blockchain applications allow users to securely connect a wallet, send transactions, and verify them on a public ledger.

The application allows users to:

- Connect Pera Wallet
- View account balance
- Send ALGO transactions
- View recent transaction history
- Verify transactions on the Algorand TestNet Explorer

---

## 🚀 Problem Statement

Traditional financial systems rely on centralized institutions to process and verify transactions.  
This project demonstrates a decentralized approach where:

- Users control their own wallet
- Transactions are signed securely by the user
- No centralized authority manages funds
- All transactions are permanently recorded on a public blockchain

The goal is to showcase real Web3 interaction using the Algorand ecosystem.

---

## 🛠 Tech Stack

- React (Frontend Framework)
- Vite (Build Tool)
- Tailwind CSS (UI Styling)
- Algorand JavaScript SDK
- Pera Wallet Connect
- Algonode TestNet API (Algod + Indexer)

---

## ⚙️ Setup Instructions

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Rohan-Gupta0999/Algorand---Web3-Wallet.git
```

### 2️⃣ Navigate into the Project Folder

```bash
cd Algorand---Web3-Wallet
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Start Development Server

```bash
npm run dev
```

The application will run at:

```
http://localhost:5173
```

---

## 🔐 How It Works

1. User connects Pera Wallet.
2. The wallet address is retrieved.
3. Account balance is fetched from Algorand TestNet.
4. User enters receiver address and amount.
5. Transaction is created using Algorand SDK.
6. Transaction is signed securely inside Pera Wallet.
7. Signed transaction is submitted to the Algorand network.
8. Transaction confirmation is awaited.
9. Transaction history is fetched using the Algorand Indexer API.

---

## 🌍 Public Ledger Verification

All transactions can be verified on the Algorand TestNet Explorer:

https://testnet.explorer.perawallet.app

To verify:
- Copy your wallet address OR
- Copy your transaction ID
- Paste it into the explorer search bar

You will see:
- Sender address
- Receiver address
- Amount
- Timestamp
- Block confirmation details

---

## 🧠 Architecture Overview

Frontend (React + Vite)  
⬇  
Pera Wallet (Secure Transaction Signing)  
⬇  
Algonode TestNet API (Algod + Indexer)  
⬇  
Algorand Blockchain (Public Ledger)

---

## 📎 Proof of Transaction

Transaction ID:
RAWRKBVE7SNTS47JRQCTHEUW766KQGHAI5ZVSS7PEHLWW55UZS2A

Network:
Algorand TestNet

Block:
60992293

Explorer Link:
https://testnet.explorer.perawallet.app/tx/RAWRKBVE7SNTS47JRQCTHEUW766KQGHAI5ZVSS7PEHLWW55UZS2A


---

## 👤 Author

Rohan Gupta  
GitHub: https://github.com/Rohan-Gupta0999
