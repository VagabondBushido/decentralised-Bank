# Decentralised Bank 

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.0-363636.svg?style=for-the-badge)](https://soliditylang.org/)
[![React](https://img.shields.io/badge/React-18.0.0-61DAFB.svg?style=for-the-badge)](https://reactjs.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra-Modern-319795.svg?style=for-the-badge)](https://chakra-ui.com/)

A Modern Web3 Banking Experience Built on Ethereum

[Features](#features) • [Demo](#demo) • [Installation](#installation) • [Tech Stack](#tech-stack)

</div>

## Features

- **Secure Wallet Connection**: Seamless MetaMask integration
- **Easy Transactions**: Deposit, withdraw, and transfer ETH
- **Modern UI/UX**: Built with Chakra UI for a sleek experience
- **Real-time Updates**: Instant balance and transaction feedback
- **Web3 Ready**: Full blockchain integration
- **Smart Contract Security**: Foundry-tested smart contracts

## Demo Video

<div align="center">
  <a href="https://www.youtube.com/watch?v=zvCgCukIsIs" target="_blank">
    <img src="https://img.youtube.com/vi/zvCgCukIsIs/maxresdefault.jpg" 
      alt="Decentralised Bank Demo" 
      style="width:100%; max-width:800px;" />
  </a>
</div>

## Tech Stack

### Frontend
```
React 18  |  Chakra UI  |  ethers.js  |  Web3.js
```

### Smart Contract
```
Solidity  |  Foundry  |  Forge (testing)
```

## Installation

```bash
# Clone the repository
git clone https://github.com/VagabondBushido/decentralised-Bank

# Install dependencies
cd decentralised-Bank
npm install

# Start the development server
npm run dev
```

## Smart Contract

```solidity
// Core functionality of our bank
contract DecentralisedBank {
    mapping(address => uint256) public balances;
    
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    // Additional functions: withdraw, transfer, etc.
}
```

## Security Features

- Smart contract audited
- Environment variables protection
- Input validation
- Gas optimization

## Roadmap

- Smart Contract Development
- Web Interface
- Mobile App Integration
- Multi-chain Support

## Contributing

1. Fork it (<https://github.com/VagabondBushido/decentralised-Bank/fork>)
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -am 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Create a new Pull Request

## License

<div align="center">
  
Released under the [MIT](LICENSE) License

<br />

<sub>Built with by [VagabondBushido](https://github.com/VagabondBushido)</sub>

</div>

---

> GitHub [@VagabondBushido](https://github.com/VagabondBushido) &nbsp;&middot;&nbsp;
> Twitter [@VagabondBushido](https://twitter.com/VagabondBushido)
