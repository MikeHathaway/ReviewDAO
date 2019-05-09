pragma solidity ^0.5.7;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";

// https://medium.freecodecamp.org/create-an-ethereum-token-using-open-source-contracts-open-zeppelin-1e132e6233ed
// https://blog.zeppelin.solutions/a-gentle-introduction-to-ethereum-programming-part-3-abdd9644d0c2

contract ReviewCoin is ERC20, ERC20Detailed, ERC20Mintable, ERC20Burnable {

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals
    )
        ERC20Burnable()
        ERC20Mintable()
        ERC20Detailed("Review Coin", "RDAO", 18)
        ERC20()
        public
    {}
}