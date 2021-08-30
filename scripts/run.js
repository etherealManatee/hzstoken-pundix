async function main() {

    const [deployer, otherAddress] = await ethers.getSigners();

    const HZSTokenFactory = await hre.ethers.getContractFactory("HZSToken") //compile
    const HZSTokenContract = await HZSTokenFactory.deploy() //deploy
    await HZSTokenContract.deployed()
    console.log("Contract Address:", HZSTokenContract.address)
    console.log("Contract deployed by:", deployer.address)

    const TokenTimelockFactory = await hre.ethers.getContractFactory("HZSTokenTimelock") //compile
    const tokenTimelockContract = await TokenTimelockFactory.deploy(deployer.address) //deploy
    await tokenTimelockContract.deployed()
    console.log("TokenTimelock Contract Address:", tokenTimelockContract.address)
    

    let contractBalance = await HZSTokenContract.balanceOf(deployer.address)
    console.log("Balance: ", contractBalance.toString())

    let mintTxn = await HZSTokenContract.mint(deployer.address,1000000)
    await mintTxn.wait()

    contractBalance = await HZSTokenContract.balanceOf(deployer.address)
    console.log("Balance: ", contractBalance.toString())

    let burnTxn = await HZSTokenContract.burn(500000)
    await burnTxn.wait()

    contractBalance = await HZSTokenContract.balanceOf(deployer.address)
    console.log("Balance: ", contractBalance.toString())

    let approve = await HZSTokenContract.approve(tokenTimelockContract.address, 30000000)
    let deposit = await tokenTimelockContract.deposit(HZSTokenContract.address, 30000000)
    contractBalance = await HZSTokenContract.balanceOf(deployer.address)
    console.log("Balance: ", contractBalance.toString())

    let withdraw = await tokenTimelockContract.withdraw(HZSTokenContract.address, 30000000)
}


main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1)
    })