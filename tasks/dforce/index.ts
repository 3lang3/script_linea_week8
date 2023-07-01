import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, logGasCost, getBalanceWithLog } from '../base'
import { task } from '@/utils/utils';

export const run = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const marketCa = '0x7cb50dcb90F7F98120B18C727556942f25e30F2a'
  const supplyEthCa = '0x1FC94B633F5F25171F86B7b4Ac845e762E3233Bd'
  let abi = ['function enterMarkets(address[])']
  let contract = new ethers.Contract(marketCa, abi, signer);

  await task(async () => {
    const tx = await contract.enterMarkets([supplyEthCa], await overrides(wallet.address));
    logGasCost(await tx.wait())
  }, {
    taskName: 'dforce_enterMarkets',
    walletAddr: wallet.address,
  })

  abi = ['function mint(address) payable']
  contract = new ethers.Contract(supplyEthCa, abi, signer);
  const amount = ethers.utils.parseEther('0.001');

  await task(async () => {
    const tx = await contract.mint(wallet.address, {
      ...await overrides(wallet.address),
      value: amount
    });
    logGasCost(await tx.wait())
  }, {
    taskName: 'dforce_mint',
    walletAddr: wallet.address,
  })

  const borrowCa = '0xC6d76E0706f3F75a13441Fc66A87D76C17BA6E70'
  abi = ['function borrow(uint256)']
  contract = new ethers.Contract(borrowCa, abi, signer);
  await task(async () => {
    const balance = await getBalanceWithLog(signer);
    const emitGas = await contract.estimateGas.borrow(100000);
    const emitCost = emitGas.mul(await signer.getGasPrice());
    if (emitCost.gt(balance)) {
      console.log(`❌余额不足，跳过...`)
      return false
    }
    const tx = await contract.borrow(100000, await overrides(wallet.address));
    logGasCost(await tx.wait())
  }, {
    taskName: 'dforce_borrow',
    walletAddr: wallet.address,
  })
}