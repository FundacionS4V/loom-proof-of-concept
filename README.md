# s4v dapp proof-of-concept on loom network

a proof of concept for s4v platform smart contract funding on LOOM network

-----

## install truffle & yarn 
```shell
# node:16
$ npm install -g truffle yarn
```

-----

## init truffle
```shell
$ truffle init
```

-----

## install and launch loom

* create folder & get latest loom stable version
```shell
$ mkdir loom && cd loom/
$ curl https://raw.githubusercontent.com/loomnetwork/loom-sdk-documentation/master/scripts/get_loom.sh
```

* add loom as alias on .bashrc
```bash
alias loom="$HOME/loom/loom"
```

* get private/public key pair
```shell
$ loom genkey -a loom_public_key -k loom_private_key
```

* launch local loom chain
```shell
$ loom init # only required first time
$ loom run
```

-----

## configure local loom network

* build truffle-config loom network object:
```js
local_loom: {
    provider: () => {
        const privateKey = readFileSync(path.join(__dirname, 'loom_private_key'), 'utf-8');
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
        return loomTruffleProvider;
    },
    network_id: "*"
},          
```

-----

## compile and deploy contracts to local loom network

* add contract; check `DonationPot.sol` file

* build deploy script (migration script in loom language); check `2_donation_pot_migration.js` file

* run truffle migrate
```sh
$ truffle migrate --network local_loom
```

-----

## deployment result

contract was successfully deployed to loom chain with no associated deployment costs, as in 0 gas was required.

in order to interact with the contract in the form of a transfer (a donation, i.e.) a Transfer Gateway must be built to interface between loom mainchain and bitcoin or ethereum chains, which are the chains that our donors would have their credits on and from where they will be 'transfered' into our loom dappchain account.

this gateway would give s4v the opportunity to provide financial and governance tokens to manage and use the platform, reducing to 0 whichever cost related to interacting with smart contracts and allowing us to limit fees to the ones corresponding to incoming cryptocurrency and final transfer to winning ngos.

however, a Transfer Gateway will not be built in the scope of this proof of concept as circumstances of time and cost are not exceeded by the expected the value it may add to the outcome of our current experiment and decision making regarding next steps; transfer gas fees for such transactions is expected to be around values obtained during polygon proof of concept simulation.

## next steps

* report findings
* make decision based on technical experiments output, market analysis, legal and finacial advice
* build web platform to introduce new project funding dinamics that may give access to previously neglected ngos, and run a pilot; or build autonomous humanitarian blockchain based ecosystem experiments (donation pools, promotion and voluntary work for governance tokens, public chain managed through humanitarian stakeholders under byzantine algorithms, and so on)    