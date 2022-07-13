const Web3 = require("web3");

var DonationPot = artifacts.require("DonationPot");

const web3 = new Web3("http://127.0.0.1:46658");
const ngos = [
    "chamartin sin fronteras", 
    "balones unidos",
    "hospitales de la cruz"
];
const goal = web3.utils.toWei("2.0");
const apiIds = [];
const accounts = [];
const accountsObjects = [];
(async () => {
    let index = 1;
    for (let ngo of ngos) {
        const _account = await web3.eth.accounts.create();
        accountsObjects.push({
            ..._account,
            name: ngo
        });
        apiIds.push(index);
        index++;
        accounts.push(_account.address);
    }
    for (let _acc of accountsObjects) {
        console.log(_acc);
    }
})();

module.exports = async function(deployer, network) {
    if (network === "local_loom") {
        await deployer.deploy(
            DonationPot,
            goal,
            ngos,
            apiIds,
            accounts
        );
        const donationPot = await DonationPot.deployed();
        console.log(`donation pot deployed at ${donationPot.address}`);
    }
}