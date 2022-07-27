import { ethers } from "hardhat"

const deploy = async () => {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000)
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS

  // const lockedAmount = ethers.utils.parseEther("1")

  const Transactions = await ethers.getContractFactory("Transactions")
  const transactions = await Transactions.deploy()

  await transactions.deployed()

  console.log("Transactions deployed to:", transactions.address)
}

const runDeploy = async () => {
  try {
    await deploy()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runDeploy()
