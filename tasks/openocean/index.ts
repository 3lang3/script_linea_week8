import { ethers } from 'ethers';
import { lineaProvider as provider, overrides, logGasCost } from '../base'
import { loop, task } from '@/utils/utils';

export const run = async (wallet: ethers.Wallet) => {
  const signer = wallet.connect(provider);
  const value = ethers.utils.parseEther('0.001');
  let r: any;
  await task(async () => {
    console.log(`[openocean] swap 参数获取中...`)
    r = await fetch(`https://ethapi.openocean.finance/v2/59140/swap?inTokenSymbol=ETH&inTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&outTokenSymbol=WETH&outTokenAddress=0x2C1b868d6596a18e32E61B901E4060C872647b6C&amount=${value.toString()}&gasPrice=1500000011&disabledDexIds=&slippage=100&account=${wallet.address}&referrer=0x3487ef9f9b36547e43268b8f0e2349a226c70b53`, {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "if-none-match": "W/\"c9d-j79pBeCBOnIi8+ZMq0YCpQE28E4\"",
        "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "token": ""
      },
      "referrer": "https://app.openocean.finance/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "omit"
    });
    r = await r.json();
    const tx = await signer.sendTransaction({
      to: '0x6352a56caadC4F1E25CD6c75970Fa768A3304e64',
      data: r.data,
      ...await overrides(wallet.address),
      value
    });
    logGasCost(await tx.wait())
  }, {
    taskName: 'openocean_swap',
    walletAddr: wallet.address,
  })
}