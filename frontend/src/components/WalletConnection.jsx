import { Button, Text, VStack, HStack, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaWallet, FaSignOutAlt } from 'react-icons/fa'

const MotionBox = motion(Box)

/**
 * WalletConnection Component
 * Handles wallet connection and disconnection
 * Shows the connected account address and connection status
 */
function WalletConnection({ account, connectWallet, disconnectWallet }) {
  return (
    <Box w="100%">
      {account ? (
        <MotionBox
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          w="100%"
        >
          <Box
            p={6}
            bg="whiteAlpha.200"
            borderRadius="2xl"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="whiteAlpha.300"
            textAlign="center"
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          >
            <VStack spacing={4}>
              <HStack spacing={3} justify="center">
                <Box
                  w={3}
                  h={3}
                  borderRadius="full"
                  bg="green.400"
                  boxShadow="0 0 10px #48BB78"
                />
                <Text 
                  fontSize="lg"
                  color="whiteAlpha.900"
                  fontWeight="medium"
                  textShadow="0 0 10px rgba(255, 255, 255, 0.2)"
                >
                  {account.slice(0, 6)}...{account.slice(-4)}
                </Text>
              </HStack>
              <Button
                variant="ghost"
                colorScheme="red"
                leftIcon={<FaSignOutAlt />}
                onClick={disconnectWallet}
                color="red.300"
                fontWeight="semibold"
                _hover={{
                  bg: 'whiteAlpha.200',
                  transform: 'translateY(-2px)',
                  color: 'red.200'
                }}
                _active={{
                  transform: 'translateY(0)',
                  bg: 'whiteAlpha.300'
                }}
              >
                Disconnect
              </Button>
            </VStack>
          </Box>
        </MotionBox>
      ) : (
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          w="100%"
        >
          <Button
            w="100%"
            size="lg"
            bgGradient="linear(to-r, brand.primary, brand.secondary)"
            color="gray.900"
            leftIcon={<FaWallet />}
            onClick={connectWallet}
            py={7}
            fontSize="lg"
            fontWeight="bold"
            textShadow="0 0 10px rgba(0, 0, 0, 0.2)"
            boxShadow="0 4px 20px rgba(0, 255, 159, 0.3)"
            _hover={{
              bgGradient: "linear(to-r, brand.secondary, brand.primary)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 30px rgba(0, 255, 159, 0.4)"
            }}
            _active={{
              transform: "translateY(0)",
              boxShadow: "0 4px 20px rgba(0, 255, 159, 0.3)"
            }}
          >
            Connect Wallet
          </Button>
        </MotionBox>
      )}
    </Box>
  )
}

export default WalletConnection
