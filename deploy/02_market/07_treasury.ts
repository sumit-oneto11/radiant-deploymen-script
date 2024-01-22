import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { waitForTx } from "../../helpers/utilities/tx";
import { COMMON_DEPLOY_PARAMS } from "../../helpers/env";
import { ethers } from "ethers";

const func: DeployFunction = async function ({
    getNamedAccounts,
    deployments,
    ...hre
}: HardhatRuntimeEnvironment) {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    console.log("Deploying MultiFeeDistribution as treasury contract");
    const MultiFeeDistributionArtifact = await deploy(
        "MultiFeeDistribution",
        {
            from: deployer,
            ...COMMON_DEPLOY_PARAMS,
        }
    );

    const tokenArgs = [
        "Alpha",
        "ALP",
        "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8",

    ];

    // console.log("Deploying ALPHA-OFT token");
    // await deploy(
    //     "RadiantOFT", 
    //     {
    //         from: deployer,
    //         args:tokenArgs,
    //         ...COMMON_DEPLOY_PARAMS,
    //     }
    // );

    return true;
};

func.id = "AlphaOFT";
func.tags = ["market", "multiFeeDistribution"];

export default func;