<h1 align="center">
  <br>
  <a href="https://github.com/VagabondBushido/decentralised-Bank">
    <img src="https://raw.githubusercontent.com/VagabondBushido/decentralised-Bank/main/assets/logo.png" alt="Decentralised Bank" width="200">
  </a>
  <br>
  Decentralised Bank
  <br>
</h1>

<h4 align="center">A Modern Web3 Banking Experience Built on <a href="https://ethereum.org" target="_blank">Ethereum</a></h4>

<p align="center">
  <a href="#key-features">
    <img src="https://img.shields.io/badge/STATUS-ACTIVE-brightgreen?style=for-the-badge" alt="Project Status" />
  </a>
  <a href="#how-to-use">
    <img src="https://img.shields.io/badge/PLATFORM-WEB-blue?style=for-the-badge" alt="Platform" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/LICENSE-MIT-red?style=for-the-badge" alt="License" />
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#credits">Credits</a>
</p>

<div align="center">
  <img src="https://raw.githubusercontent.com/VagabondBushido/decentralised-Bank/main/assets/banner.gif" alt="product-banner" width="800" />
</div>

## ⚡ Key Features

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://raw.githubusercontent.com/VagabondBushido/decentralised-Bank/main/assets/wallet.gif" width="64" />
        <br />
        <b>Secure Wallet</b>
        <br />
        MetaMask Integration
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/VagabondBushido/decentralised-Bank/main/assets/transaction.gif" width="64" />
        <br />
        <b>Fast Transactions</b>
        <br />
        Instant Transfers
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/VagabondBushido/decentralised-Bank/main/assets/security.gif" width="64" />
        <br />
        <b>Bank Grade Security</b>
        <br />
        Audited Smart Contracts
      </td>
    </tr>
  </table>
</div>

## 🎥 Demo

<div align="center">
  <a href="https://www.youtube.com/watch?v=zvCgCukIsIs">
    <img src="https://raw.githubusercontent.com/VagabondBushido/decentralised-Bank/main/assets/demo-preview.png" alt="Demo Video" width="800">
  </a>
  <p>👆 Click the image above to watch the demo video</p>
</div>

## 🚀 Tech Stack

<div align="center">
  <img src="https://skillicons.dev/icons?i=solidity,react,nodejs,vite" alt="Tech Stack" />
  <br />
  <img src="https://skillicons.dev/icons?i=js,ts,html,css" alt="Languages" />
</div>

### Smart Contract
```solidity
// Simplified view of our main contract
contract DecentralisedBank {
    mapping(address => uint256) public balances;
    
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    // ... more functions
}
```

## 💫 How To Use

<div align="center">

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FVagabondBushido%2Fdecentralised-Bank)

</div>

```bash
# Clone this repository
$ git clone https://github.com/VagabondBushido/decentralised-Bank

# Install dependencies
$ cd decentralised-Bank
$ npm install

# Run the dapp
$ npm run dev
```

## 🌐 Architecture

<div align="center">
  <img src="https://raw.githubusercontent.com/VagabondBushido/decentralised-Bank/main/assets/architecture.svg" alt="Architecture Diagram" width="600" />
</div>

```mermaid
flowchart TD
    A[Web Interface] -->|Web3.js| B[MetaMask]
    B -->|JSON-RPC| C[Ethereum Network]
    C -->|Smart Contract| D[Decentralised Bank]
    D -->|Events| A
```

## 🔐 Security Features

<div align="center">
  <table>
    <tr>
      <td align="center" width="33%">
        <img src="https://raw.githubusercontent.com/VagabondBushido/decentralised-Bank/main/assets/audit.png" width="64" />
        <br />
        <b>Audited Code</b>
      </td>
      <td align="center" width="33%">
        <img src="https://raw.githubusercontent.com/VagabondBushido/decentralised-Bank/main/assets/encryption.png" width="64" />
        <br />
        <b>Encrypted Data</b>
      </td>
      <td align="center" width="33%">
        <img src="https://raw.githubusercontent.com/VagabondBushido/decentralised-Bank/main/assets/protection.png" width="64" />
        <br />
        <b>Attack Protection</b>
      </td>
    </tr>
  </table>
</div>

## ⭐ Key Benefits

- 🏦 **Decentralized Banking**: No central authority
- 💸 **Low Fees**: Minimal transaction costs
- 🔒 **Security First**: Built with security in mind
- ⚡ **Fast Transactions**: Quick transfer times
- 🌐 **Global Access**: Available worldwide
- 📱 **Mobile Ready**: Responsive design

## 🎯 Roadmap

<div align="center">
  <table>
    <tr>
      <td align="center">✅</td>
      <td>Smart Contract Development</td>
    </tr>
    <tr>
      <td align="center">✅</td>
      <td>Web Interface</td>
    </tr>
    <tr>
      <td align="center">🏗️</td>
      <td>Mobile App Integration</td>
    </tr>
    <tr>
      <td align="center">📅</td>
      <td>Multi-chain Support</td>
    </tr>
  </table>
</div>

## 🤝 Contributing

<div align="center">
  <img src="https://raw.githubusercontent.com/VagabondBushido/decentralised-Bank/main/assets/contributing.gif" alt="Contributing" width="300" />
</div>

1. Fork it (<https://github.com/VagabondBushido/decentralised-Bank/fork>)
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -am 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Create a new Pull Request

## 📜 License

<div align="center">
  
Released under the [MIT](LICENSE) License

<br />

<img src="https://raw.githubusercontent.com/VagabondBushido/decentralised-Bank/main/assets/thank-you.gif" alt="Thank You" width="200" />

<br />

<sub>Built with ❤️ by [VagabondBushido](https://github.com/VagabondBushido)</sub>

</div>

---

> GitHub [@VagabondBushido](https://github.com/VagabondBushido) &nbsp;&middot;&nbsp;
> Twitter [@VagabondBushido](https://twitter.com/VagabondBushido)
