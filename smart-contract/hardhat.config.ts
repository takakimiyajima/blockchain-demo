// https://eth-goerli.g.alchemy.com/v2/IVkvBUQxVDnAAHp6jsa2g2kpqwAJqibp
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  defaultNetwork: "goerli",
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/IVkvBUQxVDnAAHp6jsa2g2kpqwAJqibp",
      accounts: [
        "fd8f974e7e80409a76f6daff5831bdcf9616d46aa915213334a91f34e6936349",
      ]
    }
  }
};

export default config;
