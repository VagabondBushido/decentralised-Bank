import { useState } from 'react'
import {
  Box,
  Button,
  VStack,
  Input,
  Text,
  useToast,
  HStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Divider
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ethers } from 'ethers'
import { 
  FaEthereum, 
  FaArrowUp, 
  FaArrowDown, 
  FaPaperPlane,
  FaUserAlt,
  FaTimes
} from 'react-icons/fa'

const MotionBox = motion(Box)

/**
 * BankActions Component
 * Handles all interactions with the SimpleBank smart contract including:
 * - Depositing ETH into the contract
 * - Withdrawing ETH from the contract
 * - Transferring ETH to other addresses
 */
function BankActions({ contract, setBalance, provider }) {
  // State management for form inputs and loading state
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast() // For showing status messages

  /**
   * Updates the user's balance in the UI after transactions
   */
  const updateBalance = async () => {
    if (contract) {
      const balance = await contract.getBalance()
      setBalance(ethers.utils.formatEther(balance))
    }
  }

  /**
   * Handles ETH deposits into the contract
   * The ETH is taken from the user's wallet and stored in the contract
   */
  const handleDeposit = async () => {
    // Validate deposit amount
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid amount greater than 0',
        status: 'error',
        duration: 5000
      })
      return
    }

    try {
      setIsLoading(true)
      // Call the deposit function and send ETH
      const tx = await contract.deposit({
        value: ethers.utils.parseEther(amount)
      })
      
      // Show pending toast
      const pendingToast = toast({
        title: 'Transaction Pending',
        description: 'Your deposit is being processed...',
        status: 'info',
        duration: null
      })

      await tx.wait() // Wait for transaction confirmation
      await updateBalance() // Update UI with new balance
      
      // Close pending toast and show success
      toast.close(pendingToast)
      toast({
        title: 'Deposit successful',
        status: 'success',
        duration: 5000
      })
      setAmount('') // Clear input field
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handles withdrawals from the contract
   * The ETH is sent from the contract back to the user's wallet
   */
  const handleWithdraw = async () => {
    // Validate withdrawal amount
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid amount greater than 0',
        status: 'error',
        duration: 5000
      })
      return
    }

    try {
      setIsLoading(true)
      // Call the withdraw function
      const tx = await contract.withdraw(ethers.utils.parseEther(amount))
      
      // Show pending toast
      const pendingToast = toast({
        title: 'Transaction Pending',
        description: 'Your withdrawal is being processed...',
        status: 'info',
        duration: null
      })

      await tx.wait() // Wait for transaction confirmation
      await updateBalance() // Update UI with new balance
      
      // Close pending toast and show success
      toast.close(pendingToast)
      toast({
        title: 'Withdrawal successful',
        status: 'success',
        duration: 5000
      })
      setAmount('') // Clear input field
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000
      })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handles transfers to other addresses
   * The ETH is sent directly from the contract to the recipient's wallet
   */
  const handleTransfer = async () => {
    // Validate transfer amount
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid amount greater than 0',
        status: 'error',
        duration: 5000
      })
      return
    }

    // Validate recipient's Ethereum address
    if (!recipient || !ethers.utils.isAddress(recipient)) {
      toast({
        title: 'Invalid address',
        description: 'Please enter a valid Ethereum address',
        status: 'error',
        duration: 5000
      })
      return
    }

    // Get current user's address
    const signer = contract.signer
    const currentAccount = await signer.getAddress()

    // Prevent transfers to self
    if (recipient.toLowerCase() === currentAccount.toLowerCase()) {
      toast({
        title: 'Invalid transfer',
        description: 'Cannot transfer to your own address',
        status: 'error',
        duration: 5000
      })
      return
    }

    try {
      setIsLoading(true)
      // Call the transfer function
      const tx = await contract.transfer(
        recipient,
        ethers.utils.parseEther(amount)
      )
      
      // Show pending toast
      const pendingToast = toast({
        title: 'Transaction Pending',
        description: 'Your transfer is being processed...',
        status: 'info',
        duration: null
      })

      await tx.wait() // Wait for transaction confirmation
      await updateBalance() // Update UI with new balance
      
      // Close pending toast and show success
      toast.close(pendingToast)
      toast({
        title: 'Transfer successful',
        description: `Successfully transferred ${amount} ETH to ${recipient.slice(0, 6)}...${recipient.slice(-4)}`,
        status: 'success',
        duration: 5000
      })
      // Clear input fields
      setAmount('')
      setRecipient('')
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box w="100%">
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        w="100%"
      >
        <Box
          p={6}
          bg="whiteAlpha.200"
          borderRadius="2xl"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="whiteAlpha.300"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
        >
          <VStack spacing={6} align="center" w="100%">
            <Text 
              fontSize="xl" 
              fontWeight="bold" 
              color="whiteAlpha.900"
              textAlign="center"
              textShadow="0 0 10px rgba(255, 255, 255, 0.2)"
            >
              Bank Actions
            </Text>

            {/* Amount Input */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaEthereum color="#00ff9f" />
              </InputLeftElement>
              <Input
                placeholder="Amount in ETH"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                step="0.000000000000000001"
                color="whiteAlpha.900"
                bg="whiteAlpha.200"
                borderColor="whiteAlpha.300"
                _placeholder={{ color: 'whiteAlpha.600' }}
                _hover={{
                  borderColor: 'whiteAlpha.400',
                  bg: 'whiteAlpha.300'
                }}
                _focus={{
                  borderColor: 'brand.primary',
                  bg: 'whiteAlpha.300',
                  boxShadow: '0 0 0 1px #00ff9f'
                }}
              />
              {amount && (
                <InputRightElement>
                  <IconButton
                    size="sm"
                    icon={<FaTimes />}
                    variant="ghost"
                    onClick={() => setAmount('')}
                    aria-label="Clear amount"
                    color="whiteAlpha.700"
                    _hover={{
                      bg: 'whiteAlpha.300',
                      color: 'whiteAlpha.900'
                    }}
                  />
                </InputRightElement>
              )}
            </InputGroup>

            {/* Action Buttons */}
            <HStack spacing={4} w="100%">
              <Button
                flex={1}
                leftIcon={<FaArrowDown />}
                onClick={handleDeposit}
                isLoading={isLoading}
                bgGradient="linear(to-r, green.400, teal.400)"
                color="white"
                py={6}
                fontWeight="semibold"
                _hover={{
                  bgGradient: "linear(to-r, green.500, teal.500)",
                  transform: "translateY(-2px)",
                  shadow: "lg"
                }}
                _active={{
                  transform: "translateY(0)"
                }}
              >
                Deposit
              </Button>
              <Button
                flex={1}
                leftIcon={<FaArrowUp />}
                onClick={handleWithdraw}
                isLoading={isLoading}
                bgGradient="linear(to-r, red.400, pink.400)"
                color="white"
                py={6}
                fontWeight="semibold"
                _hover={{
                  bgGradient: "linear(to-r, red.500, pink.500)",
                  transform: "translateY(-2px)",
                  shadow: "lg"
                }}
                _active={{
                  transform: "translateY(0)"
                }}
              >
                Withdraw
              </Button>
            </HStack>

            <Divider borderColor="whiteAlpha.400" />

            {/* Recipient Input */}
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaUserAlt color="#00b8ff" />
              </InputLeftElement>
              <Input
                placeholder="Recipient Address (0x...)"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                color="whiteAlpha.900"
                bg="whiteAlpha.200"
                borderColor="whiteAlpha.300"
                _placeholder={{ color: 'whiteAlpha.600' }}
                _hover={{
                  borderColor: 'whiteAlpha.400',
                  bg: 'whiteAlpha.300'
                }}
                _focus={{
                  borderColor: 'brand.secondary',
                  bg: 'whiteAlpha.300',
                  boxShadow: '0 0 0 1px #00b8ff'
                }}
              />
              {recipient && (
                <InputRightElement>
                  <IconButton
                    size="sm"
                    icon={<FaTimes />}
                    variant="ghost"
                    onClick={() => setRecipient('')}
                    aria-label="Clear recipient"
                    color="whiteAlpha.700"
                    _hover={{
                      bg: 'whiteAlpha.300',
                      color: 'whiteAlpha.900'
                    }}
                  />
                </InputRightElement>
              )}
            </InputGroup>

            {/* Transfer Button */}
            <Button
              w="100%"
              leftIcon={<FaPaperPlane />}
              onClick={handleTransfer}
              isLoading={isLoading}
              isDisabled={!recipient}
              bgGradient="linear(to-r, brand.secondary, brand.accent)"
              color="white"
              py={6}
              fontWeight="semibold"
              _hover={{
                bgGradient: "linear(to-r, brand.accent, brand.secondary)",
                transform: "translateY(-2px)",
                shadow: "lg"
              }}
              _active={{
                transform: "translateY(0)"
              }}
              _disabled={{
                opacity: 0.6,
                cursor: 'not-allowed',
                transform: 'none'
              }}
            >
              Transfer
            </Button>
          </VStack>
        </Box>
      </MotionBox>
    </Box>
  )
}

export default BankActions
