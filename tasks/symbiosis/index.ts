import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, logGasCost } from '../base'
import { task } from '@/utils/utils';

const WETH = '0x2c1b868d6596a18e32e61b901e4060c872647b6c'
const USDT = '0xAED47A51AeFa6f95A388aDA3c459d94FF46fC4BB'

export const run = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  let ca = '0x106c6743C1f8ED9c5c824887AadAc8215294f8b6'
  let abi = ['function swapExactETHForTokens(uint256, address[], address, uint256) payable'] as any;
  let contract = new ethers.Contract(ca, abi, signer);
  let amount = ethers.utils.parseEther('0.001');
  let deadline = Math.floor(Date.now() / 1000) + 120 * 60 * 20;
  await task(async () => {
    const tx = await contract.swapExactETHForTokens(
      ethers.constants.Zero,
      [WETH, USDT],
      wallet.address,
      deadline,
      {
        ...await overrides(wallet.address),
        value: amount,
      }
    )
    logGasCost(await tx.wait())
  }, {
    taskName: 'symbiosis_swap',
    walletAddr: wallet.address,
  })
}