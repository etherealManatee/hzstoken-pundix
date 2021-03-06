//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract HZSTokenTimelock {
    uint public constant duration = 1 hours;
    uint public immutable end;
    address payable public immutable owner;


    constructor (address payable _owner) {
        end = block.timestamp + duration;
        owner = _owner;
    }

    function deposit(address token, uint amount) external {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
    }

    receive() external payable {}

    function withdraw(address token, uint amount) external {
        require(msg.sender == owner, "only owner");
        require(block.timestamp >= end, "too early");
        if(token == address(0)) {
            owner.transfer(amount);
        } else {
            IERC20(token).transfer(owner, amount);
        }
    }
}