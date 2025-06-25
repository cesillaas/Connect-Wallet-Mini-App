import { useState } from "react";
import { ethers } from "ethers";

export default function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Connect Your Wallet</h2>
      <button onClick={connectWallet}>
        {account ? "Connected!" : "Connect Wallet"}
      </button>
      {account && <p>Address: {account}</p>}
    </div>
  );
}
