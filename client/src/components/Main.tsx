import { useState } from 'react'
import { useTransactionContext } from "../contexts/Transaction"

export const Main = () => {
  const [inputFormData, setInputFormData] = useState({
    addressTo: '',
    amount: ''
  })

  const { connectWallet, sendTransaction } = useTransactionContext()

  const handleChange = (value: string, name: string) => {
    setInputFormData((prevInputFormData) => ({ ...prevInputFormData, [name]: value }))
  }

  const handleSubmit = () => {
    const { addressTo, amount } = inputFormData
    if (!addressTo || !amount) {
      return
    }

    sendTransaction({ to: addressTo, amount })
  }

  return (
    <div className="mainContainer">
      <div className="cryptContainer">
        <h1 className="title">Crypt Card</h1>
        <button type="button">
          <p className="buttonText" onClick={connectWallet}>Connect wallet</p>
        </button>
      </div>

      <div className="inputContainer">
        <input type="text" placeholder="Address" name="addressTo" onChange={(e) => handleChange(e.target.value, 'addressTo')} />
        <input
          type="number"
          placeholder="Currency (ETH)"
          name="amount"
          step={"0.0001"}
          onChange={(e) => handleChange(e.target.value, 'amount')}
        />
        <button type="button" onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};
