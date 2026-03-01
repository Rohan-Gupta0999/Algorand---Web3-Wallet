import { useState } from "react";
import { PeraWalletConnect } from "@perawallet/connect";
import algosdk from "algosdk";

const peraWallet = new PeraWalletConnect();
function App() {
  const algodClient = new algosdk.Algodv2(
  "",
  "https://testnet-api.algonode.cloud",
  ""
);
const indexerClient = new algosdk.Indexer(
  "",
  "https://testnet-idx.algonode.cloud",
  ""
);
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  const connectWallet = async () => {
    try {
      const newAccounts = await peraWallet.connect({ shouldShowSignTxnToast: false });
      if (!newAccounts || newAccounts.length === 0) {
  console.log("No accounts returned");
  return;
}

const address = newAccounts[0];
      console.log("Connected Address:", address);
      setWalletAddress(address);

      const accountInfo = await algodClient.accountInformation(address).do();
      const algoBalance = Number(accountInfo.amount) / 1000000;

      setBalance(algoBalance);
      await fetchTransactions(address);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTransactions = async (address) => {
  try {
    const txns = await indexerClient
      .lookupAccountTransactions(address)
      .limit(10)
      .do();
    setTransactions(txns.transactions);
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
  }
};
  const sendPayment = async () => {
  try {
    if (!walletAddress) {
      alert("Connect wallet first");
      return;
    }

    if (
    !walletAddress ||
    !receiver ||
    receiver.trim().length === 0 ||
    !amount ||
    isNaN(parseFloat(amount)) ||
    parseFloat(amount) <= 0
) {
  alert("Enter valid receiver and amount");
  return;
}

    const suggestedParams = await algodClient.getTransactionParams().do();
    console.log("walletAddress:", walletAddress);
    console.log("receiver:", receiver);
    console.log("suggestedParams:", suggestedParams);
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
  sender: walletAddress.trim(),
  receiver: receiver.trim(),
  amount: Math.round(parseFloat(amount) * 1_000_000),
  suggestedParams,
});

  const signedTxn = await peraWallet.signTransaction([
  [{ txn }]
]);

const  txId  = await algodClient
  .sendRawTransaction(signedTxn[0])
  .do();

await algosdk.waitForConfirmation(algodClient, txId, 4);

    alert("Transaction Successful!");

    const accountInfo = await algodClient.accountInformation(walletAddress).do();
    const algoBalance = Number(accountInfo.amount) / 1000000;
    setBalance(algoBalance);
    await fetchTransactions(walletAddress);

  } catch (error) {
    console.error(error);
    alert("Transaction Failed");
  }
};
  return (
    <div className="min-h-screen bg-[#1c1c1f] text-white flex flex-col">

  {/* Navbar */}
  <div className="flex justify-between items-center px-10 py-6 border-b border-white/10">
    <h1 className="text-2xl font-semibold tracking-wide">Algora</h1>

    <button
      onClick={connectWallet}
      className="bg-[#0a84ff] hover:bg-blue-600 transition px-5 py-2 rounded-full text-sm font-medium"
    >
      {walletAddress ? "Connected" : "Connect Wallet"}
    </button> 
  </div>

  {/* Main Container */}
  <div className="max-w-4xl w-full mx-auto mt-14 space-y-10 px-6">

    {/* Wallet Card */}
    <div className="bg-[#1c1c1f] rounded-2xl p-8 shadow-xl border border-white/5">
      <p className="text-gray-400 text-sm mb-2">Balance</p>

      <h2 className="text-5xl font-bold tracking-tight mb-4">
        {balance} ALGO
      </h2>

      <p className="text-gray-500 text-sm break-all">
        {walletAddress ? walletAddress : "Wallet not connected"}
      </p>
    </div>

    {/* Send Payment */}
    <div className="bg-[#1c1c1f] rounded-2xl p-8 shadow-lg border border-white/5 space-y-6">
      <h3 className="text-lg font-medium">Send Payment</h3>

      <input
        type="text"
        placeholder="Receiver Address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        className="w-full bg-[#2a2a2e] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a84ff]"
      />

      <input
        type="number"
        placeholder="Amount in ALGO"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full bg-[#2a2a2e] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a84ff]"
      />

      <button
     onClick={sendPayment}
     className="w-full bg-white text-black font-semibold py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95">
     Send ALGO
      </button>
    </div>

    {/* Transaction History */}
    <div className="bg-[#1c1c1f] rounded-2xl p-8 shadow-lg border border-white/5">
      <h3 className="text-lg font-medium mb-6">Transaction History</h3>

      {transactions.length === 0 ? (
  <div className="text-gray-500 text-sm">No transactions yet.</div>
) : (
  transactions.map((txn) => (
    <div key={txn.id} className="border border-white/10 rounded-xl p-4 space-y-1 text-sm mb-3">
      <div className="flex justify-between">
        <span className="text-gray-400">From</span>
        <span className="text-white truncate max-w-[200px]">{txn.sender}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">To</span>
        <span className="text-white truncate max-w-[200px]">
        {txn.paymentTransaction?.receiver || "N/A"}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Amount</span>
        <span className="text-white">
          {txn.paymentTransaction
          ? (Number(txn.paymentTransaction.amount) / 1_000_000).toFixed(3) + " ALGO"
          : "N/A"}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Date</span>
        <span className="text-white">
          {txn.roundTime
          ? new Date(txn.roundTime * 1000).toLocaleString()
          : "N/A"}
        </span>
      </div>
    </div>
  ))
)}
    </div>

  </div>
</div>
  );
}

export default App;