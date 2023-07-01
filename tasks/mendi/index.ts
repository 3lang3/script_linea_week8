import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, approveErc20, logGasCost } from '../base'
import { task } from '@/utils/utils';

export const supply = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const ca = '0x4E4e3EbB5d55787885a871F3D9b23638A68E3681';
  const abi = ['function mint(uint256)']
  const contract = new ethers.Contract(ca, abi, signer);

  // 抵押1usdc
  const amount = ethers.utils.parseUnits('1', 6);
  await task(async () => {
    await approveErc20(
      signer,
      '0xf56dc6695cf1f5c364edebc7dc7077ac9b586068',
      ca
    )
    const tx = await contract.mint(amount, await overrides(wallet.address));
    logGasCost(await tx.wait())
  }, {
    taskName: 'mendi_supply',
    walletAddr: wallet.address,
  })
}

export const borrow = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const usdcSupplyAddr = '0x4E4e3EbB5d55787885a871F3D9b23638A68E3681'
  let ca = '0x48B9A979aEd1452Df792193Fd6E676605ab324D7';
  let abi = [
    'function enterMarkets(address[])',
    'function borrowAllowed(address, address, uint256) view returns (uint256)'
  ]
  let contract = new ethers.Contract(ca, abi, signer);
  await task(async () => {
    try {
      await contract.borrowAllowed(usdcSupplyAddr, wallet.address, ethers.utils.parseUnits('0.01', 6))
    } catch (error) {
      const tx = await contract.enterMarkets([usdcSupplyAddr], await overrides(wallet.address));
      logGasCost(await tx.wait())
    }
  }, {
    taskName: 'mendi_enterMarkets',
    walletAddr: wallet.address,
  })

  // 借出usdt
  ca = '0x3ED88159612B029a21174250A9DC03366b1119Ae'
  abi = ['function borrow(uint256)']
  contract = new ethers.Contract(ca, abi, signer);
  await task(async () => {
    const tx = await contract.borrow(100000, await overrides(wallet.address));
    logGasCost(await tx.wait())
  }, {
    taskName: 'mendi_borrow',
    walletAddr: wallet.address,
  })
}

export const run = async (wallet: ethers.Wallet) => {
  await supply(wallet);
  await borrow(wallet);
}