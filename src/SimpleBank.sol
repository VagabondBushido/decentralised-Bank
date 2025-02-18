// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/**
 * @title SimpleBank
 * @dev A simple bank contract that allows users to deposit, withdraw, and transfer ETH
 * The contract holds the actual ETH and manages user balances
 */
contract SimpleBank {
    // Mapping from user address to their balance in the bank
    mapping(address => uint256) private balances;
    // Contract owner's address (set during deployment)
    address public owner;

    // Events to log important actions
    event Deposit(address indexed account, uint256 amount);
    event Withdrawal(address indexed account, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Allows users to deposit ETH into the bank
     * The deposited ETH is stored in the contract and tracked in the balances mapping
     * Requirements:
     * - Must send a non-zero amount of ETH
     */
    function deposit() public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    /**
     * @dev Allows users to withdraw their ETH from the bank
     * @param amount The amount of ETH to withdraw
     * Requirements:
     * - Amount must be greater than 0
     * - User must have sufficient balance
     */
    function withdraw(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        balances[msg.sender] -= amount;
        // Send ETH back to the user's wallet
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit Withdrawal(msg.sender, amount);
    }

    /**
     * @dev Allows users to transfer ETH directly to another address
     * The ETH is sent from the contract to the recipient's wallet
     * @param to The recipient's address
     * @param amount The amount of ETH to transfer
     * Requirements:
     * - Recipient address must be valid
     * - Amount must be greater than 0
     * - Sender must have sufficient balance
     */
    function transfer(address to, uint256 amount) public {
        require(to != address(0), "Invalid address");
        require(amount > 0, "Amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        
        // Send ETH directly to recipient's wallet
        (bool success, ) = to.call{value: amount}("");
        require(success, "Transfer to recipient failed");
        
        emit Transfer(msg.sender, to, amount);
    }

    /**
     * @dev Returns the caller's balance in the bank
     * @return uint256 The balance of the caller
     */
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    /**
     * @dev Returns the total ETH held by the contract
     * @return uint256 The contract's ETH balance
     */
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
