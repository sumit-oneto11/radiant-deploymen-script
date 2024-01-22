import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { waitForTx } from "../../helpers/utilities/tx";
import { COMMON_DEPLOY_PARAMS } from "../../helpers/env";
import { ethers } from "ethers";

/**
 * The following script runs before the deployment starts
 */

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  ...hre
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  // console.log("\nAccounts", await getNamedAccounts());
  const { deployer, addressesProviderRegistryOwner} = await getNamedAccounts();
  // console.log("\n", "addressesProviderRegistryOwner", addressesProviderRegistryOwner);
  // console.log("\n", "deployer", deployer);
  const poolAddressesProviderRegistryArtifact = await deploy(
    "LendingPoolAddressesProviderRegistry",
    {
      from: deployer,
      ...COMMON_DEPLOY_PARAMS,
    }
  );
  
  //console.log(0.00000000001541*6812938202258); 
  
  //High=0.0000000002042
  //Low=0.0000000000002793
    
  //console.log("Buy", (100/0.0000000000002793));
  //console.log("Sell", (358037952022914.44*0.0000000001042));

  const registryInstance = (
    (await hre.ethers.getContractAt(
      poolAddressesProviderRegistryArtifact.abi,
      poolAddressesProviderRegistryArtifact.address
    ))
  ).connect(await hre.ethers.getSigner(deployer));

  await waitForTx(
    await registryInstance.transferOwnership(deployer)
  );

  deployments.log(
    `[Deployment] Transferred ownership of PoolAddressesProviderRegistry to: ${deployer} `
  );
  return true;
};

func.id = "PoolAddressesProviderRegistry";
func.tags = ["core", "registry"];

export default func;