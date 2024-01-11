import { HardhatUserConfig, task } from "hardhat/config";
import {
  DETERMINISTIC_DEPLOYMENT,
  DETERMINISTIC_FACTORIES,
  ETHERSCAN_KEY,
  getCommonNetworkConfig,
  hardhatNetworkSettings,
  loadTasks,
} from "./helpers/hardhat-config-helpers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";


const SKIP_LOAD = process.env.SKIP_LOAD === "true";
const TASK_FOLDERS = ["misc", "market-registry"];
/*
500 ARB
500 Polygon
500 IOTX
500 VET
500 AVAX
500 Sol
600 Alt Coin/Meme coin
*/
// Prevent to load tasks before compilation and typechain
if (!SKIP_LOAD) {
  loadTasks(TASK_FOLDERS);
}

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.6.6",
        settings: {
          optimizer: {
          enabled: true,
          runs: 200,
          },
          evmVersion: "london",
          },
      },      
      {
        version: "0.8.12",
        settings: {
          optimizer: {
          enabled: true,
          runs: 200,
          },
          evmVersion: "london",
          },
      },
      {
        version: "0.5.0",
        settings: {
          optimizer: {
          enabled: true,
          runs: 200,
          },
          evmVersion: "london",
          },
      },
    ],
  },

  networks: {
    hardhat: hardhatNetworkSettings,
    localhost: {
      url: "http://127.0.0.1:8545",
      ...hardhatNetworkSettings,
    },
    goerli: {
      url: "https://goerli-rollup.arbitrum.io/rpc/",
      accounts: {
        mnemonic: "write gloom scout romance yard tone imitate galaxy ask verify pull treat", // Replace with your Goerli testnet mnemonic
      },
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/52fbbe7060b44185a1c778abae716a1d",
      accounts: {
        mnemonic: "write gloom scout romance yard tone imitate galaxy ask verify pull treat", // Replace with your Goerli testnet mnemonic
      },
    },
  },  etherscan: {
    apiKey: {
      polygonMumbai: 'BTWY55K812MXHTGVS1XHR9EWM9NAAQP1H3',
      "arbitrum-goerli": 'JC25Q4FIHIMIX31QWVICNQ3UFIR3FXK9QC',
    },
    customChains: [
      {
        network: "arbitrum-goerli",
        chainId: 421613,
        urls: {
          apiURL: "https://api-goerli.arbiscan.io/api",
          browserURL: "https://goerli.arbiscan.io/"
        }
      }
    ]
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    aclAdmin: {
      default: 0,
    },
    emergencyAdmin: {
      default: 0,
    },
    poolAdmin: {
      default: 0,
    },
    addressesProviderRegistryOwner: {
      default: 0,
    },
    treasuryProxyAdmin: {
      default: 1,
    },
    incentivesProxyAdmin: {
      default: 1,
    },
    incentivesEmissionManager: {
      default: 0,
    },
    incentivesRewardsVault: {
      default: 0,
    },
  },
  useDefenderDeploy: true
};



