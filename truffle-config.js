const Provider = require('@truffle/hdwallet-provider');
const address = '0x952eeb716694aCB115f53245CBCa1E3BD74528f9';
const privateKey = '19fa88d8c12d536b7931e231fce363df0e2c2f680a02a37f17ac32b2576c0cf2';

const provider = new Provider(privateKey, 'HTTP://127.0.0.1:8545'); 

 

module.exports = {

  networks: {

     rinkeby: {
       provider: () => provider,
       network_id: 4,
     },
     ganache: {
      provider: () => provider,
      network_id: 5777,
     // gas: 5500000,        // Ropsten has a lower block limit than mainnet
     // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
     // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
     // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      // version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
}
