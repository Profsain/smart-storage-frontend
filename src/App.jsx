import { useEffect, useState } from 'react'
import web3 from './web3/web3'
import contract from './web3/contract'
import './App.css'

function App() {
  const [account, setAccount] = useState("");
  const [number, setNumber] = useState("");
  const [storedNumber, setStoredNumber] = useState("")

  useEffect(() => { 
    const loadBlockchainData = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const currentNumber = await contract.methods.getNumber().call();
      setStoredNumber(currentNumber)
    };

    loadBlockchainData();
  }, []);

  // handle set new number
  const handleSetNumber = async () => {
    try {
      await contract.methods.addNumber(number).send({ from: account });
      const updatedNumber = await contract.methods.getNumber().call();

      setStoredNumber(updatedNumber);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  }
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Simple Storage Contract</h2>
        <p>
          <b>Connected Account:</b> {account}
        </p>

        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter a number"
        />
        <button onClick={handleSetNumber}>Set Number</button>

        <h3>Stored Number: {storedNumber}</h3>
      </div>
    </>
  );
}

export default App
