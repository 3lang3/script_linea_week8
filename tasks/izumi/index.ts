import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, logGasCost } from '../base'
import { limitOrderAbi, liquidityAbi, swapAbi } from './abi';
import { task } from '@/utils/utils';

function num2Hex(e) {
  if (e < 10)
    return String(e);
  return "ABCDEF"[e - 10]
}

function fee2Hex(e) {
  const t = e % 16
    , n = Math.floor(e / 16) % 16
    , i = Math.floor(e / 256) % 16
    , a = Math.floor(e / 4096) % 16;
  return "0x" + num2Hex(0) + num2Hex(0) + num2Hex(a) + num2Hex(i) + num2Hex(n) + num2Hex(t)
}

function appendHex(e, t) {
  return e + t.slice(2)
}

function getTokenChainPath(e, t) {
  var n;
  let i = null !== (n = e[0].wrapTokenAddress) && void 0 !== n ? n : e[0].address;
  for (let s = 0; s < t.length; s++) {
    var a;
    i = appendHex(i, fee2Hex(t[s])),
      i = appendHex(i, null !== (a = e[s + 1].wrapTokenAddress) && void 0 !== a ? a : e[s + 1].address)
  }
  return i
}

export const swap = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const iface = new ethers.utils.Interface(swapAbi);
  const calldatas = [];
  const amount = ethers.utils.parseEther('0.001')
  const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 20;
  calldatas.push(
    iface.encodeFunctionData('swapAmount', [{
      recipient: wallet.address,
      amount: amount,
      path: getTokenChainPath([{
        "address": "0x67A1f4A939b477A6b7c5BF94D97E45dE87E608eF",
      },
      {
        "address": "0x876508837C162aCedcc5dd7721015E83cbb4e339",
      }], [400]),
      minAcquired: ethers.constants.Zero,
      deadline,
    }])
  )
  calldatas.push(
    iface.encodeFunctionData('refundETH', [])
  )

  const contract = new ethers.Contract('0xa9754f0D9055d14EB0D2d196E4C51d8B2Ee6f4d3', ['function multicall(bytes[]) payable'], signer)

  await task(async () => {
    const tx = await contract.multicall(calldatas, {
      ...await overrides(wallet.address),
      value: amount
    });
    logGasCost(await tx.wait())
  }, {
    taskName: 'izumi_swap',
    walletAddr: wallet.address,
  })
}

export const addLimitOrder = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const routerContract = new ethers.Contract("0x1eE5eDC5Fe498a2dD82862746D674DB2a5e7fef6", limitOrderAbi, signer)
  const slot = await routerContract.getDeactiveSlot(signer.address);
  const calldatas = [];
  const amount = ethers.utils.parseEther('0.001');
  const deadline = Math.floor(Date.now() / 1000) + 2000 * 60;
  calldatas.push(
    routerContract.interface.encodeFunctionData('newLimOrder', [
      slot,
      {
        tokenX: '0x67A1f4A939b477A6b7c5BF94D97E45dE87E608eF',
        tokenY: '0x876508837C162aCedcc5dd7721015E83cbb4e339',
        fee: 2000,
        pt: 173520,
        amount,
        sellXEarnY: true,
        deadline,
      }
    ])
  )

  calldatas.push(routerContract.interface.encodeFunctionData('refundETH', []));
  const contract = new ethers.Contract('0x1eE5eDC5Fe498a2dD82862746D674DB2a5e7fef6', ['function multicall(bytes[]) payable'], signer)

  await task(async () => {
    const tx = await contract.multicall(calldatas, {
      ...await overrides(wallet.address),
      value: amount
    });
    logGasCost(await tx.wait())
  }, {
    taskName: 'izumi_addLimitOrder',
    walletAddr: wallet.address,
  })
}

export const addLq = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const iface = new ethers.utils.Interface(liquidityAbi);
  const calldatas = [];
  const amount = ethers.utils.parseEther('0.0001')
  const deadline = Math.floor(Date.now() / 1000) + 360 * 60 * 60 * 20;
  calldatas.push(
    iface.encodeFunctionData('mint', [{
      tokenX: '0x67A1f4A939b477A6b7c5BF94D97E45dE87E608eF',
      tokenY: '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068',
      fee: 2000,
      pl: -39760,
      pr: -35440,
      xLim: amount,
      yLim: ethers.constants.Zero,
      amountXMin: ethers.constants.Zero,
      amountYMin: ethers.constants.Zero,
      deadline,
      miner: wallet.address
    }])
  )
  calldatas.push(
    iface.encodeFunctionData('refundETH', [])
  )
  const contract = new ethers.Contract('0xC6C7c2edF70A3245ad6051E93809162B9758ce08', ['function multicall(bytes[]) payable'], signer)

  await task(async () => {
    const tx = await contract.multicall(calldatas, {
      ...await overrides(wallet.address),
      value: amount
    });
    logGasCost(await tx.wait())
  }, {
    taskName: 'izumi_addLq',
    walletAddr: wallet.address,
  })
}

export const run = async (wallet: ethers.Wallet) => {
  await swap(wallet);
  await addLimitOrder(wallet);
  await addLq(wallet);
}