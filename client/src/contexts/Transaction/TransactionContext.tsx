import { createContext, ReactNode, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../../utils/connect'

type Transaction = {
  to: string,
  amount: string
}

type Context = {
  connectWallet: () => void
  sendTransaction: (transaction: Transaction) => void
}

type TransactionContextProviderProps = {
  children: ReactNode
}

export const TransactionContext = createContext<Context | undefined>(undefined)

// get smart-contract
const getSmartContract = () => {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer
  const signer = provider.getSigner()

  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )

  return transactionContract
}

export const TransactionProvider = ({ children }: TransactionContextProviderProps) => {
  const [currentAccount, setCurrentAccount] = useState('')

  const { ethereum } = window

  // check if you connected metamask or not
  const checkMetamaskWalletConnected = async () => {
    if (!ethereum) {
      return alert('You need to install MetaMask')
    }

    // get a MetaMask's account ID
    const account = await ethereum.request({ method: 'eth_accounts' })
    console.log(account)
  }

  const connectWallet = async () => {
    if (!ethereum) {
      return alert('You need to install MetaMask')
    }

    // start to connect MetaMask's account
    const account = await ethereum.request({ method: 'eth_requestAccounts' })
    console.log(account[0])
    setCurrentAccount(account[0])
  }

  const sendTransaction = async ({ to, amount }: Transaction) => {
    if (!ethereum) {
      return alert('You need to install MetaMask')
    }

    const transactionContract = getSmartContract()
    const parsedAmount = ethers.utils.parseEther(amount)._hex

    const transactionParameters = {
      gas: '0x2710',
      to,
      from: currentAccount,
      value: parsedAmount
    }

    await ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    })

    const transactionHash = await transactionContract.addToBlockChain(
      to,
      parsedAmount
    )

    console.log(`Loading... ${transactionHash.hash}`)
    await transactionHash.wait()
    console.log(`Success! ${transactionHash.hash}`)
  }

  useEffect(() => {
    checkMetamaskWalletConnected()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    connectWallet,
    sendTransaction,
  }

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>
}