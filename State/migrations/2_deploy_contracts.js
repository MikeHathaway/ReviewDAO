const ReviewCoin = artifacts.require("./ReviewCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(ReviewCoin);
};

