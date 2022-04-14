const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const Web3 = require('web3');
const bodyParser = require('body-parser');


const Provider = require('@truffle/hdwallet-provider');

const SimpleBank = require('./build/contracts/SimpleBank.json');
const address = '0x952eeb716694aCB115f53245CBCa1E3BD74528f9';
const contract_add = '0x28ABdE244f3a90C28b44fFBd7C69c5c7a2868447';
const privateKey = '19fa88d8c12d536b7931e231fce363df0e2c2f680a02a37f17ac32b2576c0cf2';
const infuraUrl = 'HTTP://127.0.0.1:8545'; 

app.use(bodyParser.urlencoded({ extended: true })); 

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
  });
  
  /*app.post('/example', (req, res) => {
    //console.log(req)
    res.send(`Full name is:${req.body.fname} ${req.body.lname}.`);
  });*/

  app.post('/deposit', (req, res) => {
    const init2 = async () => {

        const web3 = new Web3(infuraUrl);
        var bal = await web3.eth.getBalance(address);
        const networkId = await web3.eth.net.getId();
        console.log(networkId);
        const myContract = new web3.eth.Contract(
          SimpleBank.abi,
          SimpleBank.networks[networkId].address
        );
        web3.eth.accounts.wallet.add(privateKey);
        //console.log(req)
        const tx = await myContract.methods.deposit();
        const gas = 100000;
        console.log(tx);
      console.log(gas);
      const gasPrice = await web3.eth.getGasPrice();
      const data = tx.encodeABI();
      console.log(data)
      const nonce = await web3.eth.getTransactionCount(address);
      const txData = {
        from: address,
        value: Number(BigInt(1000000000000000000)),
        gas
      };
      /* Send() functionality */
      const receipt = await web3.eth.sendTransaction(txData);
      res.send(`Depositing in ${1000000000000000000}. Check your Account/account_balance. It should get decreased by 1 ether. This is Hard-coded (1 Ether). You may like to change. Check Withdraw functionality for getting the data input from HTML page`)
        //res.send(`Account Balance ${bal}.`);
        //res.send(`Balance ${networkId}.`);
        }
        init2();
        
        
  });

  app.post('/balance', (req, res) => {
    const init2 = async () => {

      const web3 = new Web3(infuraUrl);
      var bal = await web3.eth.getBalance(address);
      const networkId = await web3.eth.net.getId();
      console.log(networkId);
      const myContract = new web3.eth.Contract(
        SimpleBank.abi,
        SimpleBank.networks[networkId].address
      );
      web3.eth.accounts.wallet.add(privateKey);
      //console.log(req)
      /* call() functionality */
      res.send(`Smart Contract and Account Balance ${await myContract.methods.balance().call()}, ${bal}.`);
      //res.send(`Account Balance ${bal}.`);
      //res.send(`Balance ${networkId}.`);
      }
      init2();
  });

  app.post('/withdraw', (req, res) => {
    //console.log(req)
    
    var value_big = BigInt(req.body.value);
    /* Use Send() functionality to implement this. Check Deposit method.*/
      //await myContract.methods.withdraw(value_big).send({from: address, gas: 100000});
      console.log(`Here is: ${value_big}`);
    res.send(`You Entered: ${value_big}. We didn't implement it. So implement it if you prefer this functionality`);
    
      
  });

  app.post('/acc_balance', (req, res) => {
    const init2 = async () => {
/* Check your account balance. This is not a Smartcontract Method*/
      const web3 = new Web3(infuraUrl);
      var bal = await web3.eth.getBalance(address);
      const networkId = await web3.eth.net.getId();
      console.log(networkId);
      const myContract = new web3.eth.Contract(
        SimpleBank.abi,
        SimpleBank.networks[networkId].address
      );
      web3.eth.accounts.wallet.add(privateKey);
      //console.log(req)
      res.send(`Account Balance ${bal}.`);
      //res.send(`Balance ${networkId}.`);
      }
      init2();
  });

  app.use('/', router);
  app.listen(process.env.port || 3000);
  
  console.log('Running at Port 3000');





