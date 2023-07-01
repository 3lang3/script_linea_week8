import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, approveErc20, logGasCost } from '../base'
import { swapAbi } from './abi';
import erc20abi from '@/const/erc20.json';
import { task } from '@/utils/utils';

const usdtCa = '0xF7C13fEFf0b098eE55A58683a54509fDe40eCbaa'
const nbsCa = '0xb6f7E3e51053CD7Be555696aF0a136Bdf58Aa56a'

export const swap = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const usdt = new ethers.Contract(usdtCa, erc20abi, signer);
  const usdtBalance = await usdt.balanceOf(wallet.address);

  if (usdtBalance.isZero()) {
    const abi = ['function claimTokens()']
    const usdtClaimCa = '0x87b9e734A59571f1Ec3F60e1C1722d371D2D59c7'
    const contract = new ethers.Contract(usdtClaimCa, abi, signer);
    await task(async () => {
      const tx = await contract.claimTokens(await overrides(wallet.address));
      logGasCost(await tx.wait())
    }, {
      taskName: 'noobysswap_claim_usdt',
      walletAddr: wallet.address,
    })
  }

  const ca = '0x0913482dccc4ccf7219897e0976d3a2727f4316c'
  await approveErc20(signer, usdtCa, ca)
  const contract = new ethers.Contract(ca, swapAbi, signer);
  const deadline = Math.floor(Date.now() / 1000) + 60 * 2000
  await task(async () => {
    const tx = await contract.swapExactTokensForTokens(
      ethers.utils.parseEther('100'),
      ethers.constants.Zero,
      [usdtCa, nbsCa],
      wallet.address,
      deadline,
      await overrides(wallet.address)
    )
    logGasCost(await tx.wait())
  }, {
    taskName: 'noobysswap_swap',
    walletAddr: wallet.address,
  })
}

export const addLq = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const ca = '0x0913482dccc4ccf7219897e0976d3a2727f4316c';

  const contract = new ethers.Contract(ca, swapAbi, signer);

  await task(async () => {
    await approveErc20(signer, nbsCa, ca);
    const tx = await contract.addLiquidity(
      usdtCa,
      nbsCa,
      ethers.utils.parseEther('10'),
      ethers.utils.parseEther('10'),
      ethers.constants.Zero,
      ethers.constants.Zero,
      wallet.address,
      '0x09184e729fff',
      await overrides(wallet.address)
    )
    logGasCost(await tx.wait())
  }, {
    taskName: 'noobysswap_addLq',
    walletAddr: wallet.address,
  })
}

export const run = async (wallet: ethers.Wallet) => {
  await swap(wallet);
  await addLq(wallet);
}