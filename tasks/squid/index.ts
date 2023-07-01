import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, approveErc20, logGasCost } from '../base'
import axios from 'axios';
import { loop, task } from '@/utils/utils';

export const run = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);


  const params = {
    fromChain: 59140,
    fromToken: '0xf56dc6695cf1f5c364edebc7dc7077ac9b586068',
    fromAmount: '10000',
    toChain: '43113',
    toToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    toAddress: wallet.address,
    quoteOnly: false,
    slippage: 1.5,
    enableExpress: true,
  } as any;

  let res: any;

  await loop(async () => {
    res = await axios.get('https://squid-api-git-linea-quests-0xsquid.vercel.app/v1/route', {
      params
    })
  })

  await task(async () => {
    await approveErc20(
      signer,
      '0xf56dc6695cf1f5c364edebc7dc7077ac9b586068',
      '0x9bEb991eDdF92528E6342Ec5f7B0846C24cbaB58'
    )
    let tx = await signer.sendTransaction({
      to: res.data.route.transactionRequest.targetAddress,
      data: res.data.route.transactionRequest.data,
      value: res.data.route.transactionRequest.value,
      ...await overrides(wallet.address),
    });
    logGasCost(await tx.wait())
  }, {
    taskName: 'squid_swap',
    walletAddr: wallet.address,
  })

  params.toToken = '0x57f1c63497aee0be305b8852b354cec793da43bb'
  params.receiveGasOnDestination = true
  await loop(async () => {
    res = await axios.get('https://squid-api-git-linea-quests-0xsquid.vercel.app/v1/route', {
      params
    })
  })

  await task(async () => {
    const tx = await signer.sendTransaction({
      to: res.data.route.transactionRequest.targetAddress,
      data: res.data.route.transactionRequest.data,
      value: res.data.route.transactionRequest.value,
      ...await overrides(wallet.address),
    });
    logGasCost(await tx.wait())
  }, {
    taskName: 'squid_swap_gas',
    walletAddr: wallet.address,
  })
}
