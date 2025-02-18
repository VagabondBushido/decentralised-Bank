# <div align="center">🏦 Decentralised Bank</div>

<div align="center">

[![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.0-363636?style=for-the-badge&logo=solidity)](https://docs.soliditylang.org/)
[![React](https://img.shields.io/badge/React-18.0.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra_UI-Modern-319795?style=for-the-badge&logo=chakraui)](https://chakra-ui.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br />

<h3>Modern DeFi Banking Experience on Ethereum</h3>

[Features](#-features) • [Demo](#-live-demo) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start)

<br />

</div>

## ⚡ Features

<div align="center">
  <table>
    <tr>
      <td align="center">
        <h3>🔐</h3>
        <b>Secure Wallet</b>
        <br />
        MetaMask Integration
      </td>
      <td align="center">
        <h3>💸</h3>
        <b>Easy Banking</b>
        <br />
        Deposit & Withdraw
      </td>
      <td align="center">
        <h3>⚡</h3>
        <b>Fast Transfers</b>
        <br />
        Instant & Secure
      </td>
    </tr>
  </table>
</div>

## 🎥 Live Demo

<div align="center">
  <a href="https://www.youtube.com/watch?v=zvCgCukIsIs">
    <img src="https://img.youtube.com/vi/zvCgCukIsIs/maxresdefault.jpg" 
      alt="Decentralised Bank Demo" 
      style="width:100%; max-width:800px;" />
  </a>
  <p>👆 Click the image above to watch the demo video</p>
</div>

## 🛠 Tech Stack

<div align="center">

### Frontend
<img src="https://skillicons.dev/icons?i=react,js,html,css" alt="Frontend Technologies" />
<br />
React • Chakra UI • ethers.js • Web3.js

### Backend
<img src="https://skillicons.dev/icons?i=solidity,nodejs" alt="Backend Technologies" />
<br />
Solidity • Hardhat • OpenZeppelin

</div>

## 💻 Smart Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralisedBank {
    mapping(address => uint256) public balances;
    
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    
    function deposit() public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    
    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        emit Withdrawal(msg.sender, amount);
    }
}
```

## 🚀 Quick Start

```bash
# Get started with our DApp
git clone https://github.com/VagabondBushido/decentralised-Bank
cd decentralised-Bank

# Install dependencies
npm install

# Start local development
npm run dev
```

## 🔒 Security Features

<div align="center">
  <table>
    <tr>
      <td align="center" width="33%">
        <h3>🛡️</h3>
        <b>Audited Code</b>
      </td>
      <td align="center" width="33%">
        <h3>🔐</h3>
        <b>Secure Storage</b>
      </td>
      <td align="center" width="33%">
        <h3>⚡</h3>
        <b>Gas Optimized</b>
      </td>
    </tr>
  </table>
</div>

## 🎯 Roadmap

<div align="center">
  <table>
    <tr>
      <td align="center">✅</td>
      <td><b>Smart Contract Development</b></td>
    </tr>
    <tr>
      <td align="center">✅</td>
      <td><b>Web Interface</b></td>
    </tr>
    <tr>
      <td align="center">🏗️</td>
      <td><b>Mobile App Integration</b></td>
    </tr>
    <tr>
      <td align="center">📅</td>
      <td><b>Multi-chain Support</b></td>
    </tr>
  </table>
</div>

## 🤝 Contributing

1. Fork it (<https://github.com/VagabondBushido/decentralised-Bank/fork>)
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -am 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Create a new Pull Request

## 📜 License

<div align="center">
Released under the MIT License
<br />
<br />
<sub>Built with ❤️ by [VagabondBushido](https://github.com/VagabondBushido)</sub>
</div>

---

> GitHub [@VagabondBushido](https://github.com/VagabondBushido) &nbsp;&middot;&nbsp;
> Twitter [@VagabondBushido](https://twitter.com/VagabondBushido)
