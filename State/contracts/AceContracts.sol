
pragma solidity >= 0.5.0 <0.7.0;
// import the aztec contracts so truffle compiles them
import "../node_modules/@aztec/protocol/contracts/interfaces/IAZTEC.sol";
import "../node_modules/@aztec/protocol/contracts/ACE/ACE.sol";
import "../node_modules/@aztec/protocol/contracts/ACE/validators/adjustSupply/AdjustSupply.sol";
import "../node_modules/@aztec/protocol/contracts/ACE/validators/bilateralSwap/BilateralSwap.sol";
import "../node_modules/@aztec/protocol/contracts/ACE/validators/joinSplit/JoinSplit.sol";
import "../node_modules/@aztec/protocol/contracts/ACE/validators/dividendComputation/DividendComputation.sol";
import "../node_modules/@aztec/protocol/contracts/ACE/validators/privateRange/PrivateRange.sol";
import "../node_modules/@aztec/protocol/contracts/ERC1724/ZkAsset.sol";

contract EncryptedReviewCoin {

}