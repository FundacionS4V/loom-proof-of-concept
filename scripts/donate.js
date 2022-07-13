const { readFileSync } = require('fs');
const path = require('path');
const LoomTruffleProvider = require('loom-truffle-provider');
const getDonors = require('./getDonors');
var Web3 = require('web3');
const [donor] = process.argv.slice(4);
const donationPotJSON = require(path.join(__dirname, "..", "build", "contracts", "DonationPot.json"));

module.exports = async function() {
    const donors = await getDonors();
    console.log("HELLO E", donor);
    let currentDonor;
    for (let _donor of donors) {
        if (_donor.name.toUpperCase() === donor.toUpperCase()) {
            currentDonor = _donor;
            console.log("ready to make transaction on behalf of", _donor.name, "at", _donor.address);
        } 
    }
    const privateKey = readFileSync(path.join(__dirname, "..", 'loom_private_key'), 'utf-8');
    const chainId = 'default';
    const writeURL = 'http://127.0.0.1:46658/rpc';
    const readURL = 'http://127.0.0.1:46658/query';
    const loomTruffleProvider = new LoomTruffleProvider(
        chainId,
        writeURL,
        readURL,
        privateKey
    );
    loomTruffleProvider.createExtraAccountsFromMnemonic(
        "gravity top burden flip student usage spell purchase hundred improve check genre", 
        10
    );
    const loomProvider = loomTruffleProvider.getProviderEngine();
    loomProvider.addCustomMethod('eth_balance', payload => {
        return '0x1';
    });
    const web3 = new Web3(loomProvider);
    const contract = new web3.eth.Contract(donationPotJSON['abi'], "0xC214c2BE747c4199E4FA02f6f8cD5C8eE31D0A6f");
    const amount = web3.utils.toWei("1.0");
    // wont work as donor accounts have no funds... we would need to
    // build transfer gateway and receive funds from some testnet
    const tx = await web3.eth.sendTransaction({
        from: currentDonor.address,
        to: contract.address,
        value: amount
    });
    console.log("transaction completed with hash:", tx.transactionHash);
};
