import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/connect'

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