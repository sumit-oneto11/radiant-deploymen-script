import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { COMMON_DEPLOY_PARAMS } from "../../helpers/env";

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  ...hre
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const reserveLogicArtifact =  await deploy("ReserveLogic", {
    from: deployer,
    args: [],
    ...COMMON_DEPLOY_PARAMS,
  });

  const genericLogicArtifact = await deploy("GenericLogic", {
    from: deployer,
    ...COMMON_DEPLOY_PARAMS,
    libraries: {
      ReserveLogic: reserveLogicArtifact.address,
    },
  });

  await deploy("ValidationLogic", {
    from: deployer,
    ...COMMON_DEPLOY_PARAMS,
    libraries: {
      ReserveLogic: reserveLogicArtifact.address,
      GenericLogic: genericLogicArtifact.address,
    },
  });
  
  return true;
};

func.id = "LogicLibraries";
func.tags = ["core", "logic"];

export default func;
