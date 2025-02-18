import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import {
  ChakraProvider,
  Box,
  Container,
  VStack,
  Heading,
  Text,
  useToast,
  extendTheme,
  Center
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import WalletConnection from './components/WalletConnection'
import BankActions from './components/BankActions'
import SimpleBank from './contracts/SimpleBank.json'

// Create MotionBox component
const MotionBox = motion(Box)

// Custom theme for Web3 look
const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        background: 'gray.900',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'whiteAlpha.900'
      }
    }
  },
  colors: {
    brand: {
      primary: '#00ff9f',
      secondary: '#00b8ff',
      accent: '#ff00e5'
    }
  }
})

function App() {
  const [provider, setProvider] = useState(null)
  const [contract, setContract] = useState(null)
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('0')
  const [networkError, setNetworkError] = useState(false)

  const CONTRACT_ADDRESS = '0x28Dc9A85C0f80D1f2e941ABb5ba97237efbB1503'
  const SEPOLIA_CHAIN_ID = '0xaa36a7'

  const toast = useToast()

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast({
          title: 'Wallet not found',
          description: 'Please install MetaMask or another Web3 wallet',
          status: 'error',
          duration: 5000
        })
        return
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      // Check network
      const chainId = await window.ethereum.request({
        method: 'eth_chainId'
      })

      if (chainId !== SEPOLIA_CHAIN_ID) {
        setNetworkError(true)
        toast({
          title: 'Wrong Network',
          description: 'Please connect to Sepolia network',
          status: 'error',
          duration: 5000
        })
        return
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        SimpleBank.abi,
        signer
      )

      setProvider(provider)
      setContract(contract)
      setAccount(accounts[0])
      setNetworkError(false)

      // Get initial balance
      const balance = await contract.getBalance()
      setBalance(ethers.utils.formatEther(balance))

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0])
      })

      // Listen for network changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    } catch (error) {
      console.error('Error connecting wallet:', error)
      toast({
        title: 'Connection Error',
        description: error.message,
        status: 'error',
        duration: 5000
      })
    }
  }

  const disconnectWallet = () => {
    setProvider(null)
    setContract(null)
    setAccount('')
    setBalance('0')
  }

  return (
    <ChakraProvider theme={theme}>
      <Box 
        minH="100vh" 
        w="100%" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        bgGradient="linear(to-br, gray.900, gray.800)"
        p={4}
      >
        <Box maxW="600px" w="100%" mx="auto">
          <VStack spacing={8} align="center" w="100%">
            {/* Header */}
            <MotionBox
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              textAlign="center"
              w="100%"
            >
              <Heading
                bgGradient="linear(to-r, brand.primary, brand.secondary)"
                bgClip="text"
                fontSize={["4xl", "5xl", "6xl"]}
                fontWeight="extrabold"
                mb={4}
                textShadow="0 0 20px rgba(0, 255, 159, 0.3)"
              >
                Simple Bank DApp
              </Heading>
              <Text 
                color="whiteAlpha.900" 
                fontSize={["md", "lg", "xl"]}
                textShadow="0 0 10px rgba(255, 255, 255, 0.3)"
                fontWeight="medium"
              >
                Your Decentralized Banking Solution
              </Text>
            </MotionBox>

            {/* Wallet Connection */}
            <Box w="100%">
              <WalletConnection
                account={account}
                connectWallet={connectWallet}
                disconnectWallet={disconnectWallet}
              />
            </Box>

            {/* Bank Actions */}
            {account && (
              <Box w="100%">
                <BankActions
                  contract={contract}
                  setBalance={setBalance}
                  provider={provider}
                />
              </Box>
            )}

            {/* Balance Display */}
            {account && (
              <Box
                w="100%"
                p={6}
                bg="whiteAlpha.100"
                borderRadius="2xl"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="whiteAlpha.200"
                textAlign="center"
                boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
              >
                <Text 
                  fontSize="xl" 
                  mb={2}
                  color="whiteAlpha.900"
                  fontWeight="medium"
                >
                  Your Balance
                </Text>
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  bgGradient="linear(to-r, brand.primary, brand.secondary)"
                  bgClip="text"
                  textShadow="0 0 20px rgba(0, 255, 159, 0.3)"
                >
                  {balance} ETH
                </Text>
              </Box>
            )}
          </VStack>
        </Box>
      </Box>
    </ChakraProvider>
  )
}

export default App
