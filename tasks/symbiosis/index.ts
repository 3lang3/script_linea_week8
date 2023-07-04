import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, logGasCost, getBalanceWithLog } from '../base'
import { task } from '@/utils/utils';

const WETH = '0x2c1b868d6596a18e32e61b901e4060c872647b6c'
const USDT = '0xAED47A51AeFa6f95A388aDA3c459d94FF46fC4BB'

export const run = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  let ca = '0x106c6743C1f8ED9c5c824887AadAc8215294f8b6'
  let abi = ['function swapExactETHForTokens(uint256, address[], address, uint256) payable'] as any;
  let contract = new ethers.Contract(ca, abi, signer);
  let amount = ethers.utils.parseEther('0.02');
  let deadline = Math.floor(Date.now() / 1000) + 120 * 60 * 60;
  await task(async () => {
    const balance = await getBalanceWithLog(signer);
    const overridesValue = await overrides(wallet.address)
    const emitGas = await contract.estimateGas.swapExactETHForTokens(
      ethers.constants.Zero,
      [WETH, USDT],
      wallet.address,
      deadline,
      {
        ...overridesValue,
        value: amount,
      }
    )
    const emitCost = emitGas.mul(overridesValue.maxFeePerGas);
    if (emitCost.gt(balance)) {
      console.log(`❌余额不足，跳过...`)
      return false
    }
    const tx = await contract.swapExactETHForTokens(
      ethers.constants.Zero,
      [WETH, USDT],
      wallet.address,
      deadline,
      {
        ...overridesValue,
        value: amount,
      }
    )
    logGasCost(await tx.wait());
  }, {
    taskName: 'symbiosis_swap',
    walletAddr: wallet.address,
  })

  await task(async () => {
    await fetch("https://api-v2.symbiosis.finance/crosschain/v1/testnet-swap-to-linea", {
      "headers": {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
      },
      "referrerPolicy": "no-referrer",
      "body": `{\"item\":\"${wallet.address}\"}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "omit"
    });
  }, {
    taskName: 'symbiosis_swap_api',
    walletAddr: wallet.address,
  })
}