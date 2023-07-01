import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, approveErc20, logGasCost } from '../base'
import { task } from '@/utils/utils';

// @todo withdraw
export const run = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  let ca = '0x1f524c32bb57107eed4a9383287fb008a5b10e1c'
  let abi = ['function mint()'] as any;
  let contract = new ethers.Contract(ca, abi, signer);
  await task(async () => {
    const tx = await contract.mint(await overrides(wallet.address),)
    logGasCost(await tx.wait())
  }, {
    taskName: 'zkex_mint_pepe',
    walletAddr: wallet.address,
  })

  // deposit
  ca = '0x4931Cb9e5Fc58Be00C5Fd133D0961347f3406B86'
  abi = ['function depositERC20(address, uint104, address, uint8, bool)']
  contract = new ethers.Contract(ca, abi, signer);
  await task(async () => {
    // approve
    await approveErc20(signer, ca, '0x4931cb9e5fc58be00c5fd133d0961347f3406b86')
    const tx = await contract.depositERC20(
      '0x1f524C32Bb57107Eed4a9383287fb008a5B10e1c',
      ethers.utils.parseEther('100000000'),
      wallet.address,
      1,
      false
    )
    logGasCost(await tx.wait())
  }, {
    taskName: 'zkex_deposit_pepe',
    walletAddr: wallet.address,
  })
}