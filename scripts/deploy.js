async function main() {
    const [deployer] = await ethers.getSigners()

    console.log("Deploying contracts with the account:", deployer.address)

    console.log("Account balance:", (await deployer.getBalance()).toString())

    const Token = await ethers.getContractFactory("HZSToken")
    const token = await Token.deploy()
    await token.deployed()
    
    console.log("HZSToken address:", token.address)

    const Tokenlock = await ethers.getContractFactory("HZSTokenTimelock")
    const tokenlock = await Tokenlock.deploy(deployer.address)
    await tokenlock.deployed()
    
    console.log("HZSTokenTimelock address:", tokenlock.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })