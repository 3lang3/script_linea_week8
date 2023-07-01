import { ethers } from 'ethers';
import { lineaProvider as provider, overrides } from '../base'
import { task } from '@/utils/utils';

export const run = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const iface = new ethers.utils.Interface([{
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "tokenIn",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "tokenOut",
            "type": "address"
          },
          {
            "internalType": "uint24",
            "name": "fee",
            "type": "uint24"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountOutMinimum",
            "type": "uint256"
          },
          {
            "internalType": "uint160",
            "name": "sqrtPriceLimitX96",
            "type": "uint160"
          }
        ],
        "internalType": "struct IV3SwapRouter.ExactInputSingleParams",
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "exactInputSingle",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }]);
  const amountIn = ethers.utils.parseEther('0.005')
  const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 20;
  const data = iface.encodeFunctionData('exactInputSingle', [{
    tokenIn: "0x2C1b868d6596a18e32E61B901E4060C872647b6C",
    tokenOut: "0xD2340c4ec834bf43c05B9EcCd60EeD3a20892Dcc",
    fee: 3000,
    recipient: wallet.address,
    amountIn,
    amountOutMinimum: ethers.constants.Zero,
    sqrtPriceLimitX96: 0,
  }]);
  const contract = new ethers.Contract('0x6aa397CAB00a2A40025Dbf839a83f16D5EC7c1eB', ['function multicall(uint256, bytes[]) payable'], signer)
  await task(async () => {
    const tx = await contract.multicall(deadline, [data], {
      ...await overrides(wallet.address),
      value: amountIn
    });
    await tx.wait();
  }, {
    taskName: 'uniswap_swap',
    walletAddr: wallet.address,
  })
}