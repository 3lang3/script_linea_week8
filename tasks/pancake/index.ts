import { ethers } from 'ethers';
import { poolAbi } from './abi';
import { lineaProvider as provider, overrides, logGasCost, approveErc20 } from '../base'
import { task } from '@/utils/utils';

export const swap = async (wallet: ethers.Wallet) => {
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
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const data = iface.encodeFunctionData('exactInputSingle', [{
    tokenIn: '0x2C1b868d6596a18e32E61B901E4060C872647b6C',
    tokenOut: '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068',
    fee: 2500,
    recipient: wallet.address,
    amountIn: ethers.utils.parseEther('0.01'),
    amountOutMinimum: ethers.constants.Zero,
    sqrtPriceLimitX96: 0,
  }]);
  const contract = new ethers.Contract('0x21d809FB4052bb1807cfe2418bA638d72F4aEf87', ['function multicall(uint256, bytes[]) payable'], signer)

  await task(async () => {
    const tx = await contract.multicall(deadline, [data], {
      ...await overrides(wallet.address),
      value: ethers.utils.parseEther('0.01')
    });
    logGasCost(await tx.wait());
  }, {
    taskName: 'pancake_swap',
    walletAddr: wallet.address,
  })
}

export const addLq = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const iface = new ethers.utils.Interface([{
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "token0",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "token1",
            "type": "address"
          },
          {
            "internalType": "uint24",
            "name": "fee",
            "type": "uint24"
          },
          {
            "internalType": "int24",
            "name": "tickLower",
            "type": "int24"
          },
          {
            "internalType": "int24",
            "name": "tickUpper",
            "type": "int24"
          },
          {
            "internalType": "uint256",
            "name": "amount0Desired",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1Desired",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount0Min",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1Min",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          }
        ],
        "internalType": "struct INonfungiblePositionManager.MintParams",
        "name": "params",
        "type": "tuple"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint128",
        "name": "liquidity",
        "type": "uint128"
      },
      {
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }]);
  let deadline = Math.floor(Date.now() / 1000) + 60 * 2000;
  let data = iface.encodeFunctionData('mint', [{
    token0: '0x2C1b868d6596a18e32E61B901E4060C872647b6C',
    token1: '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068',
    tickLower: -152700,
    tickUpper: -138850,
    fee: 2500,
    amount0Desired: ethers.utils.parseEther('0.001'),
    amount1Desired: ethers.utils.parseUnits('1', 6),
    amount0Min: ethers.constants.Zero,
    amount1Min: ethers.constants.Zero,
    recipient: wallet.address,
    deadline,
  }]);
  const refundETH = new ethers.utils.Interface(['function refundETH() payable']).encodeFunctionData('refundETH', []);
  const contract = new ethers.Contract('0xacFa791C833120c769Fd3066c940B7D30Cd8BC73', ['function multicall(bytes[]) payable'], signer);
  await task(async () => {
    await approveErc20(signer, '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068', contract.address)
    const tx = await contract.multicall([data, refundETH], {
      ...await overrides(wallet.address),
      value: ethers.utils.parseEther('0.01')
    });
    logGasCost(await tx.wait());
  }, {
    taskName: 'pancake_addLq',
    walletAddr: wallet.address,
  })
}

const MAX_UINT128 = 2n ** 128n - 1n;

export const rmLq = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const contract = new ethers.Contract('0xacFa791C833120c769Fd3066c940B7D30Cd8BC73', poolAbi, signer);
  await task(async () => {
    let position: any;
    let tokenId: any
    let tokenIndex = 0;
    while (!position) {
      try {
        tokenId = await contract.tokenOfOwnerByIndex(wallet.address, tokenIndex);
      } catch (error) {
        throw Error('未找到可移除的池子，请重新添加流动性')
      }
      position = await contract.positions(tokenId);
      if ((position.liquidity as ethers.BigNumber).isZero()) {
        tokenIndex++;
        position = null;
      } else {
        break;
      }

    }
    const collectParams = {
      tokenId: Number(tokenId),
      recipient: wallet.address,
      amount0Max: MAX_UINT128,
      amount1Max: MAX_UINT128
    }

    const iface = new ethers.utils.Interface(poolAbi);
    const calldatas = [];
    let deadline = Math.floor(Date.now() / 1000) + 60 * 2000;
    calldatas.push(iface.encodeFunctionData('decreaseLiquidity', [{
      tokenId: tokenId,
      liquidity: (position.liquidity as ethers.BigNumber).div(2),
      amount0Min: ethers.constants.Zero,
      amount1Min: ethers.constants.Zero,
      deadline,
    }]));
    calldatas.push(iface.encodeFunctionData('collect', [collectParams]))
    calldatas.push(iface.encodeFunctionData('unwrapWETH9', [ethers.constants.Zero, wallet.address,]));
    calldatas.push(iface.encodeFunctionData('sweepToken', [position.token1, ethers.constants.Zero, wallet.address]));
    const tx = await contract.multicall(calldatas, await overrides(wallet.address));
    logGasCost(await tx.wait());
  }, {
    taskName: 'pancake_rmLq',
    walletAddr: wallet.address,
  })
}

export const run = async (wallet: ethers.Wallet) => {
  await swap(wallet);
  await addLq(wallet);
  await rmLq(wallet);
}