// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MessageLog {
    event MessageLogged(
        address indexed sender,
        string message,
        uint256 timestamp
    );

    function logMessage(string memory message) public {
        emit MessageLogged(msg.sender, message, block.timestamp);
    }
}
