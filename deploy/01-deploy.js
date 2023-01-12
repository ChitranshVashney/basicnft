const {network}=require("hardhat")
const {deploymentsChains}=require("../helper-harhat-config")
const {verify}=require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("----------------------------------------------------")
    const basicNft = await deploy("BasicNFT", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log("----------------------------------------------------")
    // Verify the deployment
    if (!deploymentsChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(basicNft.address, arguments)
    }
}

module.exports.tags = ["all", "basicnft", "main"]