import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { COMMON_DEPLOY_PARAMS } from "../../helpers/env";
import {
  POOL_ADDRESSES_PROVIDER_ID,
  POOL_CONFIGURATOR_IMPL_ID,
  RESERVES_SETUP_HELPER_ID,
} from "../../helpers/deploy-ids";
import { getPoolConfiguratorProxy, waitForTx } from "../../helpers";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const { address: addressesProviderAddress } = await deployments.get(
    POOL_ADDRESSES_PROVIDER_ID
  );

  const poolConfigArtifact = await deploy(POOL_CONFIGURATOR_IMPL_ID, {
    contract: "LendingPoolConfigurator",
    from: deployer,
    args: [],
    ...COMMON_DEPLOY_PARAMS,
  });

  // Initialize implementation
  const poolConfig = await getPoolConfiguratorProxy(poolConfigArtifact.address);
  await waitForTx(await poolConfig.initialize(addressesProviderAddress));
  console.log("Initialized PoolConfigurator Implementation");
  return true;
};

func.id = "PoolConfigurator";
func.tags = ["market"];

export default func;
