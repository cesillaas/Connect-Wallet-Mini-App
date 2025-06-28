import { useState } from "react";
import { ethers } from "ethers";
import "../WalletConnect.css";

export default function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setAccount(address);

      const balanceBigInt = await provider.getBalance(address);
      const balanceInEth = ethers.formatEther(balanceBigInt);
      setBalance(parseFloat(balanceInEth).toFixed(4));
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Connect Your Wallet</h2>
        <button onClick={connectWallet}>
          {account ? "Connected!" : "Connect Wallet"}
        </button>

        {account && (
          <div>
            <p><strong>Address:</strong> {account}</p>
            <p><strong>ETH Balance:</strong> {balance} ETH</p>
          </div>
        )}
      </div>
    </div>
  );
}
