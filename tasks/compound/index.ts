import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, logGasCost, approveErc20 } from '../base'
import { task } from '@/utils/utils';
import { supplyAbi } from './abi';

export const run = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const allowCa = '0xa84b24A43ba1890A165f94Ad13d0196E5fD1023a';
  const ca = '0xad6729C101691A63F7d1e4CcbaD04bC8c6818a22';
  let abi = ['function allow(address, bool)'] as any;
  let contract = new ethers.Contract(allowCa, abi, signer);

  await task(async () => {
    const tx = await contract.allow(
      '0xad6729C101691A63F7d1e4CcbaD04bC8c6818a22',
      true,
      await overrides(wallet.address)
    )
    logGasCost(await tx.wait());
  }, {
    taskName: 'compound_borrow_allow',
    walletAddr: wallet.address,
  })

  await task(async () => {
    const tx = await signer.sendTransaction({
      to: ca,
      value: ethers.utils.parseEther('0.01'),
      data: '0x555029a6000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002414354494f4e5f535550504c595f4e41544956455f544f4b454e000000000000414354494f4e5f57495448445241575f415353455400000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000060000000000000000000000000a84b24a43ba1890a165f94ad13d0196e5fd1023a000000000000000000000000ec575ab94ea90f368f1ff5b832183845bb23602d000000000000000000000000000000000000000000000000002386f26fc100000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000a84b24a43ba1890a165f94ad13d0196e5fd1023a000000000000000000000000ec575ab94ea90f368f1ff5b832183845bb23602d000000000000000000000000f56dc6695cf1f5c364edebc7dc7077ac9b58606800000000000000000000000000000000000000000000000000000000000f4240'.replaceAll('ec575ab94ea90f368f1ff5b832183845bb23602d', wallet.address.toLocaleLowerCase().substring(2)),
      ...await overrides(wallet.address)
    })
    logGasCost(await tx.wait());
  }, {
    taskName: 'compound_borrow_invoke',
    walletAddr: wallet.address,
  })

  await task(async () => {
    const ca = '0xa84b24A43ba1890A165f94Ad13d0196E5fD1023a'
    const usdcAc = '0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068'
    await approveErc20(signer, usdcAc, ca)
    const contarct = new ethers.Contract(ca, supplyAbi, signer);
    const tx = await contarct.supply(
      usdcAc,
      1000000,
      await overrides(wallet.address)
    )
    logGasCost(await tx.wait());
  }, {
    taskName: 'compound_supply',
    walletAddr: wallet.address,
  })
}
