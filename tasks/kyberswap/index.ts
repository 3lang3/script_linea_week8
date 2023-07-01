import { ethers } from 'ethers';
import { poolAbi } from './abi';
import { lineaProvider as provider, overrides, logGasCost } from '../base'
import axios from 'axios';
import { loop, task } from '@/utils/utils';

export const swap = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const value = ethers.utils.parseEther('0.001');

  await task(async () => {
    let res: any;
    await loop(async () => {
      res = await axios.get('https://meta-aggregator-api.kyberswap.com/linea-goerli/api/v1/routes', {
        params: {
          tokenIn: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          tokenOut: '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068',
          amountIn: value.toString(),
          saveGas: false,
          gasInclude: false
        }
      })
      res = await axios.post('https://meta-aggregator-api.kyberswap.com/linea-goerli/api/v1/route/build', {
        deadline,
        recipient: wallet.address,
        routeSummary: res.data.data.routeSummary,
        sender: wallet.address,
        skipSimulateTx: false,
        slippageTolerance: 1999,
        source: "kyberswap"
      })
    })
    const tx = await signer.sendTransaction({
      to: res.data.data.routerAddress,
      data: res.data.data.data,
      value,
      ...await overrides(wallet.address),
    })
    logGasCost(await tx.wait())
  }, {
    taskName: 'kyberswap_swap',
    walletAddr: wallet.address,
  })
}

export const addLq = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const value = ethers.utils.parseEther('0.0001');
  const deadline = Math.floor(Date.now() / 1000) + 2000 * 60;
  const calldatas = [];
  const iface = new ethers.utils.Interface(poolAbi);
  calldatas.push(
    iface.encodeFunctionData('mint', [{
      token0: '0x2C1b868d6596a18e32E61B901E4060C872647b6C',
      token1: '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068',
      fee: 300,
      tickLower: -145680,
      tickUpper: -145500,
      ticksPrevious: [-145740, -145560],
      amount0Desired: value,
      amount1Desired: ethers.constants.Zero,
      amount0Min: ethers.constants.Zero,
      amount1Min: ethers.constants.Zero,
      recipient: wallet.address,
      deadline
    }])
  )
  calldatas.push(
    '0x1faa4133'
  )
  const contract = new ethers.Contract('0x50C11d49a6c4e95e49A6D96FbCE8ee208921Bb47', ['function multicall (bytes[]) payable'], signer);
  await task(async () => {
    const tx = await contract.multicall(calldatas,
      {
        ...await overrides(wallet.address),
        value
      }
    );
    logGasCost(await tx.wait())

  }, {
    taskName: 'kyberswap_addLq',
    walletAddr: wallet.address,
  })
}

export const run = async (wallet: ethers.Wallet) => {
  await swap(wallet);
  await addLq(wallet);
}