const GreenCredit = artifacts.require("GreenCredit");

module.exports = function(deployer) {
  deployer.deploy(GreenCredit);
};
