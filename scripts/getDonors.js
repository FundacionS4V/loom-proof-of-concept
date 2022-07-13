const { readFileSync } = require('fs');
const path = require('path');
const LoomTruffleProvider = require('loom-truffle-provider');


module.exports = async function() {
    console.log("required...");
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
    const donorNames = ['Luis', 'Karim', 'Steve', 'Alfredo'];
    const donors = [];
    let index = 1;
    const _accounts = Object.entries(Object.fromEntries(loomProvider.accounts));
    for (let donor of donorNames) {
        donors.push({
            id: index,
            name: donor,
            address: _accounts[index][0],
        });
        index++
    }
    console.log("test donor objects:", donors);
    return donors;
};
