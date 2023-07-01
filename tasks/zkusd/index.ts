import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, logGasCost } from '../base';
import erc20abi from '@/const/erc20.json';
import { task } from '@/utils/utils';

export const run = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const abi = ['function deposit(uint) payable'];
  const contract = new ethers.Contract(
    '0xF242C576aa766712C431D7eE0B1b686A6C0bE7fD',
    abi,
    signer,
  );
  const amount = ethers.utils.parseEther('0.001');

  await task(async () => {
    const tx = await contract.deposit(amount, {
      ...(await overrides(wallet.address)),
      value: amount,
    });
    logGasCost(await tx.wait())

  }, {
    taskName: 'zkusd_deposit',
    walletAddr: wallet.address,
  })

  const zkUSD = new ethers.Contract(
    '0x89f350931C8A0B81620c95cf8F1999e2d0Ce640F',
    erc20abi,
    signer,
  );

  await task(async () => {
    const zkUSDAmount = await zkUSD.balanceOf(wallet.address);
    const transferAmount = ethers.utils.parseEther('1');
    if (zkUSDAmount.lt(transferAmount)) {
      console.log(`zkUSD balance is not enough`);
      return;
    }
    const tx = await zkUSD.transfer(
      '0x00000000043DD264ca5E68e6853790E818e9Edb8',
      transferAmount,
      await overrides(wallet.address),
    );
    logGasCost(await tx.wait())
  }, {
    taskName: 'zkusd_transfer',
    walletAddr: wallet.address,
  })
};
